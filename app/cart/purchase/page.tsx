import { redirect } from 'next/navigation'

import { getCart } from '@/utils/data/getCart'
import { getCoupons } from '@/utils/data/getCoupons'
import { getCustomer } from '@/utils/data/getCustomer'
import Purchase from '@/components/Purchase'

export default async function Page() {
    const customer = await getCustomer()
    if (!customer) redirect('/login')

    const cart = await getCart()
    if (!cart) redirect('/')
    if (cart.length <= 1) redirect(`/cart`)

    const coupons = await getCoupons()

    return <Purchase customer={customer} order={cart} coupons={coupons} />
}
