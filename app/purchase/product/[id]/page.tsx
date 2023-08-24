import Purchase from '@/components/Purchase'
import { getProduct } from '@/utils/data/getProduct'
import { getUser } from '@/utils/data/getUser'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const user = await getUser()
    if (!user) redirect(`/api/auth/refresh?path=/purchase/product/${id}&auth=1`)

    const product = await getProduct(id)

    if (!product) redirect('/')

    return <Purchase customer={user} order={[product]} />
}
