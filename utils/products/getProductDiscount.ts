export const getProductDiscount = (price: string, offer: string): string =>
    `${Math.round((Number(price) / Number(offer)) * 100 - 100)}% OFF`
