// DISCOUNT PERCENTAGE
export const getDiscount = (price: string, offer: string) =>
    Math.round((Number(price) / Number(offer)) * 100 - 100)
