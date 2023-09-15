// PRICE IN THE FORMAT $0.00
export const priceFormatter = (value: string | number): string =>
    `$ ${Number(value).toFixed(2)}`
