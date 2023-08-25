import Purchase from '@/components/Purchase'
import { getCart } from '@/utils/data/getCart'
import { getUser } from '@/utils/data/getUser'
import { redirect } from 'next/navigation'

export default async function Page() {
    const user = await getUser()
    if (!user) redirect('/api/auth/refresh?path=/purchase/successfull&auth=1')

    const cart = await getCart()
    if (!cart) redirect('/')
    if (cart.length <= 1) redirect(`/`)

    return <Purchase customer={user} order={cart} />
}
