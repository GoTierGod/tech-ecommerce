import { redirect } from 'next/navigation'

import { getCoupons } from '@/utils/data/getCoupons'
import { getProduct } from '@/utils/data/getProduct'
import { getCustomer } from '@/utils/data/getCustomer'
import Purchase from '@/components/Purchase'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const customer = getCustomer()
    if (!customer) redirect('/login')

    const product = await getProduct(id)

    if (!product) redirect('/')

    const coupons = await getCoupons()

    return <Purchase customer={customer} order={[product]} coupons={coupons} />
}
