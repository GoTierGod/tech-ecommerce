import { headers } from 'next/dist/client/components/headers'

import { ComposedCustomerData, CustomerData } from '@/types/customer'

export const getCustomer = (): CustomerData => {
    let customer: CustomerData = null

    const customerHeader = headers().get('customer')
    if (customerHeader) {
        try {
            customer = JSON.parse(customerHeader) as ComposedCustomerData
        } catch (err) {
            customer = null
        }
    }

    return customer
}
