// PRICE IN THE FORMAT $0.00
export const priceStringNormalizer = (value: string): string =>
    `$ ${Number(value).toFixed(2)}`
