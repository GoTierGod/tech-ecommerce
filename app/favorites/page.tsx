import { redirect } from 'next/navigation'

import { getUser } from '@/utils/data/getUser'
import { getFavorites } from '@/utils/data/getFavorites'
import UserFavorites from '@/components/UserFavorites'

export default async function Favorites() {
    const user = await getUser()
    if (!user) redirect('/api/auth/refresh?path=/favorites&auth=1')

    const favorites = await getFavorites()

    return <UserFavorites favorites={favorites} />
}
