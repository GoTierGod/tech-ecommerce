import style from './page.module.css'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import { getUser } from '@/helpers/getUser'
import { UserData } from '@/types/users'

export default async function Login() {
    const user: UserData = await getUser()

    if (user) redirect('/')
    else
        return (
            <main>
                <div className={style.wrapper}>
                    <LoginForm />
                </div>
            </main>
        )
}
