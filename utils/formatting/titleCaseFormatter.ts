// TEXT IN TITLE CASE
export const titleCaseFormatter = (str: string): string =>
    str
        .replace(/\s/g, ' ')
        .split(' ')
        .map(word => word[0].toUpperCase() + word.substring(1))
        .join(' ')
