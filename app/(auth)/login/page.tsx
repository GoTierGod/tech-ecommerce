import style from './page.module.css'

import { redirect } from 'next/navigation'
import UserLogin from '@/components/UserLogin'
import { getUser } from '@/utils/data/getUser'
import { CustomerData } from '@/types/users'

export default async function Login() {
    const user = await getUser()

    if (user) redirect('/api/auth/refresh?path=/login&auth=0')
    else return <UserLogin />
}
