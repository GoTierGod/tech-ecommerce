import { getUser } from '@/utils/data/getUser'
import UserProfile from '@/app/(customer)/profile/_components/UserProfile'
import { redirect } from 'next/navigation'
import { titleCaseFormatter } from '@/utils/formatting/titleCaseFormatter'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Profile | Tech'
}

export default async function Page() {
    const user = await getUser()

    if (!user) redirect('/api/auth/refresh?path=/profile&auth=1')
    metadata.title = `${titleCaseFormatter(user.user.username)} | Tech`

    return <UserProfile customer={user} />
}
