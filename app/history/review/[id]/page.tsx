import { redirect } from 'next/navigation'

import { getPurchase } from '@/utils/data/getPurchase'
import { getUser } from '@/utils/data/getUser'
import PurchaseReview from '../_components/PurchaseReview'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const user = await getUser()
    if (!user) redirect(`/api/auth/refresh?path=/history/review/${id}&auth=1`)

    const purchase = await getPurchase(id)
    if (!purchase) redirect('/')

    const product = purchase.product

    return <PurchaseReview product={product} />
}
