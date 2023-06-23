// NUMBER OF INSTALLMENTS AND COST OF EACH ONE
export const getInstallments = (installments: number, offerPrice: string) =>
    `${installments}x $${(
        Number(offerPrice) / installments +
        Number(offerPrice) / 100
    ).toFixed(2)}`
