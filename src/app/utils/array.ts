export const except = (value: string) => (original: string[]) =>
  original.filter(item => item !== value);
