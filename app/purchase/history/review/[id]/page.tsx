import PurchaseReview from '@/app/purchase/history/review/_components/PurchaseReview'
import { getPurchase } from '@/utils/data/getPurchase'
import { getUser } from '@/utils/data/getUser'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const user = await getUser()
    if (!user)
        redirect(`/api/auth/refresh?path=/purchase/history/review/${id}&auth=1`)

    const purchase = await getPurchase(id)
    if (!purchase) redirect('/')

    const product = purchase.product

    return <PurchaseReview product={product} />
}
