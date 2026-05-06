type ClassValue = string | boolean | undefined | null;

export function classnames(...args: ClassValue[]): string {
  return args.filter(Boolean).join(' ');
}
