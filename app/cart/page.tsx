import UserCart from '@/app/cart/_components/UserCart'
import { getCart } from '@/utils/data/getCart'
import { getCustomer } from '@/utils/data/getCustomer'
import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'

export default async function Cart() {
    const customer = getCustomer()
    if (!customer) redirect('api/auth/refresh/?auth=1&path=/cart')

    const cart = await getCart()

    return <UserCart customer={customer} cart={cart} />
}
