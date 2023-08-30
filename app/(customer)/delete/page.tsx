import UserDelete from '@/app/(customer)/delete/_components/UserDelete'
import { getUser } from '@/utils/data/getUser'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Delete | Tech'
}

export default async function Page() {
    const user = await getUser()

    if (!user) redirect('/api/auth/refresh?path=/delete&auth=1')

    return <UserDelete customer={user} />
}
