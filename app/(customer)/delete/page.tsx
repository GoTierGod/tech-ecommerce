import UserDelete from '@/components/UserDelete'
import { getUser } from '@/utils/data/getUser'
import { CustomerData } from '@/types/users'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Delete | Tech'
}

export default async function Delete() {
    const user: CustomerData = await getUser()

    if (!user) redirect('/api/auth/refresh?path=/delete&auth=1')

    return <UserDelete customer={user} />
}
