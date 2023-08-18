// PRICE IN THE FORMAT $0.00
export const priceStringFormatter = (value: string): string =>
    `$ ${Number(value).toFixed(2)}`
