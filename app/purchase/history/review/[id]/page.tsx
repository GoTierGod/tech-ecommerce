import PurchaseReview from '@/components/PurchaseReview'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    return <PurchaseReview />
}
