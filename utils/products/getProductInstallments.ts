// NUMBER OF INSTALLMENTS AND COST OF EACH ONE
export const getProductInstallments = (
    installments: number,
    offerPrice: string
): string =>
    `${installments}x $ ${(
        Number(offerPrice) / installments +
        Number(offerPrice) / 100
    ).toFixed(2)}`
