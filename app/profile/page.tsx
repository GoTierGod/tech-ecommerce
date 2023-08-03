import { getUser } from '@/helpers/getUser'
import { CustomerData } from '@/types/users'
import UserProfile from '@/components/UserProfile'
import { redirect } from 'next/navigation'

export default async function Profile() {
    const user: CustomerData = await getUser()

    if (!user) redirect('/api/auth/refresh?path=/profile&auth=1')
    else return <UserProfile customer={user} />
}
