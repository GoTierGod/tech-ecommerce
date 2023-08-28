import Purchase from '@/app/purchase/_components/Purchase'
import { Coupon } from '@/types/tables'
import { getCart } from '@/utils/data/getCart'
import { getCoupons } from '@/utils/data/getCoupons'
import { getUser } from '@/utils/data/getUser'
import { redirect } from 'next/navigation'

export default async function Page() {
    const user = await getUser()
    if (!user) redirect('/api/auth/refresh?path=/purchase/successfull&auth=1')

    const cart = await getCart()
    if (!cart) redirect('/')
    if (cart.length <= 1) redirect(`/`)

    const coupons = await getCoupons()

    return <Purchase customer={user} order={cart} coupons={coupons} />
}
