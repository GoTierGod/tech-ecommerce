import UserRegister from '@/app/(customer)/register/_components/UserRegister'
import { getUser } from '@/utils/data/getUser'
import { redirect } from 'next/navigation'

export default async function Page() {
    const user = await getUser()

    if (user) redirect('/api/auth/refresh?path=/register&auth=0')

    return <UserRegister />
}
