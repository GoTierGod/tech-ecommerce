import style from './page.module.css'

import { redirect } from 'next/navigation'
import UserLogin from '@/components/UserLogin'
import { getUser } from '@/helpers/getUser'
import { CustomerData } from '@/types/user'

export default async function Login() {
    const user: CustomerData = await getUser()

    if (user) redirect('/api/auth/refresh?path=/login&auth=0')
    else return <UserLogin />
}
