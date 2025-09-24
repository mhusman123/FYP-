"use client";

import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Temporary auth provider - replace with NextAuth.js implementation
  return <div>{children}</div>;
}