import { redirect } from 'next/navigation'

import { getCustomer } from '@/utils/data/getCustomer'
import { getFavorites } from '@/utils/data/getFavorites'
import UserFavorites from '@/app/favorites/_components/UserFavorites'

export default async function Favorites() {
    const customer = await getCustomer()
    if (!customer) redirect('/login')

    const favorites = await getFavorites()

    return <UserFavorites customer={customer} favorites={favorites} />
}
