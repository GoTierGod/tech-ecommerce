import style from './page.module.css'

import { getUser } from '@/helpers/getUser'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import LogoutHandler from '@/components/LogoutHandler'

export default async function Logout() {
    const user = await getUser()

    if (!user) redirect('/')
    else
        return (
            <main className={style.logout}>
                <div className={style.wrapper}>
                    <LogoutHandler />
                    <Link href='/'>Back to Home</Link>
                </div>
            </main>
        )
}
