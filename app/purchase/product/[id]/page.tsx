import Purchase from '@/components/Purchase'
import { getProduct } from '@/utils/data/getProduct'
import { getUser } from '@/utils/data/getUser'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
    const user = await getUser()
    if (!user) redirect('/api/auth/refresh?path=/cart&auth=1')

    const { id } = params
    const product = await getProduct(id)

    if (!product) redirect('/')

    return <Purchase order={[product]} />
}
