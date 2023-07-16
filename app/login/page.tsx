import style from './page.module.css'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import { getUser } from '@/helpers/getUser'

export default function Login() {
    const user = getUser()

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
