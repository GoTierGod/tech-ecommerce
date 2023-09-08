import { redirect } from 'next/navigation'

import { getCart } from '@/utils/data/getCart'
import { getCoupons } from '@/utils/data/getCoupons'
import { getUser } from '@/utils/data/getUser'
import Purchase from '@/components/Purchase'

export default async function Page() {
    const user = await getUser()
    if (!user) redirect('/api/auth/refresh?path=/cart/purchase&auth=1')

    const cart = await getCart()
    if (!cart) redirect('/')
    if (cart.length <= 1) redirect(`/cart`)

    const coupons = await getCoupons()

    return <Purchase customer={user} order={cart} coupons={coupons} />
}
