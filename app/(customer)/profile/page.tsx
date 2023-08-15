import { getUser } from '@/helpers/getUser'
import { CustomerData } from '@/types/user'
import UserProfile from '@/components/UserProfile'
import { redirect } from 'next/navigation'
import { formatTitleCase } from '@/helpers/formatTitleCase'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Profile | Tech'
}

export default async function Profile() {
    const user: CustomerData = await getUser()

    if (!user) redirect('/api/auth/refresh?path=/profile&auth=1')
    metadata.title = `${formatTitleCase(user.user.username)} | Tech`

    return <UserProfile customer={user} />
}
