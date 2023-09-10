import { headers } from 'next/dist/client/components/headers'

import { Customer, CustomerData } from '@/types/users'

export const getCustomer = (): CustomerData => {
    let customer: CustomerData = null

    const customerHeader = headers().get('customer')
    if (customerHeader) {
        try {
            customer = JSON.parse(customerHeader) as Customer
        } catch (err) {
            customer = null
        }
    }

    return customer
}
