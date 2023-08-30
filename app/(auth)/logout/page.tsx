import style from './page.module.css'

import Link from 'next/link'
import { redirect } from 'next/navigation'

import Logout from '@/app/(auth)/logout/_components/Logout'
import { getUser } from '@/utils/data/getUser'

export default async function Page() {
    const user = await getUser()

    if (!user) redirect('/api/auth/refresh?path=/logout&auth=1')
    else
        return (
            <main className={style.logout}>
                <div className={style.wrapper}>
                    <Logout />
                    <Link href='/'>Back to Home</Link>
                </div>
            </main>
        )
}
