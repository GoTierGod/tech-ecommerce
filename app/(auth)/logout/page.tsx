import style from './page.module.css'

import { getUser } from '@/helpers/getUser'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import UserLogout from '@/components/UserLogout'
import { CustomerData } from '@/types/user'

export default async function Logout() {
    const user: CustomerData = await getUser()

    if (!user) redirect('/api/auth/refresh?path=/logout&auth=1')
    else
        return (
            <main className={style.logout}>
                <div className={style.wrapper}>
                    <UserLogout />
                    <Link href='/'>Back to Home</Link>
                </div>
            </main>
        )
}
