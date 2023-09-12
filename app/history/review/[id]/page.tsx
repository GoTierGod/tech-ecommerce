import { redirect } from 'next/navigation'

import { getPurchase } from '@/utils/data/getPurchase'
import { getCustomer } from '@/utils/data/getCustomer'
import PurchaseReview from '../_components/PurchaseReview'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const customer = await getCustomer()
    if (!customer) redirect('/login')

    const purchase = await getPurchase(id)
    if (!purchase) redirect('/')

    const product = purchase.product

    return <PurchaseReview product={product} />
}
