import PurchaseReport from '@/components/PurchaseReport'

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params

    return <PurchaseReport />
}
