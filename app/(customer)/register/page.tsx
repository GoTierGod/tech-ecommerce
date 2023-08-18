import style from './page.module.css'

import UserRegister from '@/components/UserRegister'
import { getUser } from '@/utils/data/getUser'
import { redirect } from 'next/navigation'

export default async function Register() {
    const user = await getUser()

    if (user) redirect('/api/auth/refresh?path=/register&auth=0')
    else return <UserRegister />
}
