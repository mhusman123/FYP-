# Build system for SST AI Suite
import os

def write_file(filepath, content):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'[SUCCESS] Wrote: {filepath}')

if __name__ == '__main__':
    print('Build system ready')
