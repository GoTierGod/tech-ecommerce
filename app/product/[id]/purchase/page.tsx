import { redirect } from 'next/navigation'

import { getCoupons } from '@/utils/data/getCoupons'
import { getProduct } from '@/utils/data/getProduct'
import { getUser } from '@/utils/data/getUser'
import Purchase from '@/components/Purchase'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const user = await getUser()
    if (!user) redirect(`/api/auth/refresh?path=/product/${id}/purchase&auth=1`)

    const product = await getProduct(id)

    if (!product) redirect('/')

    const coupons = await getCoupons()

    return <Purchase customer={user} order={[product]} coupons={coupons} />
}
