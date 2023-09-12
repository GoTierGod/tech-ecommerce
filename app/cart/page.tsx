import UserCart from '@/app/cart/_components/UserCart'
import { getCart } from '@/utils/data/getCart'
import { getCustomer } from '@/utils/data/getCustomer'
import { redirect } from 'next/navigation'

export default async function Cart() {
    const customer = await getCustomer()
    if (!customer) redirect('/login')

    const cart = await getCart()

    return <UserCart customer={customer} cart={cart} />
}
