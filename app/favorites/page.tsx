import { redirect } from 'next/navigation'

import { getCustomer } from '@/utils/data/getCustomer'
import { getFavorites } from '@/utils/data/getFavorites'
import UserFavorites from '@/app/favorites/_components/UserFavorites'

export default async function Favorites() {
    const customer = getCustomer()
    if (!customer) redirect('api/auth/refresh/?auth=1&path=/favorites')

    const favorites = await getFavorites()

    return <UserFavorites customer={customer} favorites={favorites} />
}
