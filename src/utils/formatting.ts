export function capitalize(str: string) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}
