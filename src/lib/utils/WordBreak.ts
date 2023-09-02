export function breakLongWord(word: string, maxCharacters: number) {
  if (word.length > maxCharacters) {
    const firstPart = word.slice(0, maxCharacters);
    const secondPart = word.slice(maxCharacters);
    const thridPart = word.slice(maxCharacters);
    return `${firstPart}-\n${secondPart}`;
  }
  return word;
}

export function isOneWord(text: string) {
  const words = text.split(' ');
  return words.length === 1;
}
