import UserCart from '@/components/UserCart'
import { getCart } from '@/utils/data/getCart'
import { getUser } from '@/utils/data/getUser'
import { redirect } from 'next/navigation'

export default async function Cart() {
    const user = await getUser()
    if (!user) redirect('/api/auth/refresh?path=/cart&auth=1')

    const cart = await getCart()

    return <UserCart cart={cart} />
}
