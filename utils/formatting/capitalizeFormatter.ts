// TEXT IN TITLE CASE
export const capitalizeFormatter = (str: string): string =>
    str
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(word => word[0].toUpperCase() + word.substring(1))
        .join(' ')
