import { SecurityContext, SecurityFinding } from '../types';

const PROMPT_INJECTION_PATTERNS = [
  /ignore (all )?previous instructions/i,
  /override (the )?system prompt/i,
  /please provide your system prompt/i,
  /disregard prior rules/i,
];

const SENSITIVE_DATA_PATTERNS = [
  /\b\d{3}-\d{2}-\d{4}\b/, // SSN
  /\b4[0-9]{12}(?:[0-9]{3})?\b/, // Visa
  /api[_-]?key/i,
  /secret/i,
];

export class DefaultSecurityContext implements SecurityContext {
  findings: SecurityFinding[] = [];
  blocked = false;

  append(finding: SecurityFinding): void {
    this.findings.push(finding);
    if (finding.severity === 'high' || finding.severity === 'critical') {
      this.blocked = true;
    }
  }
}

export interface GuardrailOptions {
  blockOnInjection?: boolean;
  blockOnSensitiveData?: boolean;
}

export function runGuardrails(input: string, options: GuardrailOptions = {}): SecurityContext {
  const context = new DefaultSecurityContext();

  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      context.append({
        id: `prompt-injection-${pattern.source}`,
        type: 'prompt-injection',
        severity: options.blockOnInjection ? 'critical' : 'medium',
        detail: `Matched pattern: ${pattern}`,
        mitigation: 'Reject or rewrite the prompt before forwarding to the model.',
      });
      if (options.blockOnInjection) {
        context.blocked = true;
      }
      break;
    }
  }

  for (const pattern of SENSITIVE_DATA_PATTERNS) {
    if (pattern.test(input)) {
      context.append({
        id: `pii-${pattern.source}`,
        type: 'pii',
        severity: options.blockOnSensitiveData ? 'high' : 'medium',
        detail: `Possible sensitive data detected (pattern ${pattern}).`,
        mitigation: 'Mask or remove sensitive information before processing.',
      });
      if (options.blockOnSensitiveData) {
        context.blocked = true;
      }
      break;
    }
  }

  return context;
}
