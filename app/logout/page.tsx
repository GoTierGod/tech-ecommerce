import style from './page.module.css'

import { getUser } from '@/helpers/getUser'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Logout() {
    const user = await getUser()

    if (user) redirect('/')
    else
        return (
            <main className={style.logout}>
                <div className={style.wrapper}>
                    <h1>Sucessfully Log Out!</h1>
                    <Link href='/'>Back to Home</Link>
                </div>
            </main>
        )
}
