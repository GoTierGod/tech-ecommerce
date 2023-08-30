import style from './page.module.css'

import { redirect } from 'next/navigation'

import { getUser } from '@/utils/data/getUser'
import Login from '@/app/(auth)/login/_components/Login'

export default async function Page() {
    const user = await getUser()

    if (user) redirect('/api/auth/refresh?path=/login&auth=0')
    else return <Login />
}
