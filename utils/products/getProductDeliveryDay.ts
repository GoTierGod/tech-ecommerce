export const getProductDeliveryDay = (): string =>
    new Date(new Date().setDate(new Date().getDate() + 3)).toLocaleString(
        'en-US',
        { weekday: 'long' }
    )
