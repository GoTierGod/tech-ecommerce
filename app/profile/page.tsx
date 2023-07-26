import { getUser } from '@/helpers/getUser'
import { CustomerData } from '@/types/users'
import UserProfile from '@/components/UserProfile'
import { redirect } from 'next/navigation'

export default async function Profile() {
    const user: CustomerData = await getUser()

    if (!user) return redirect('/')
    else
        return (
            <main>
                <UserProfile customer={user} />
            </main>
        )
}
