import style from './page.module.css'
import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginForm'

export default function Login() {
    const cookie = cookies().has('authTokens')

    if (cookie) redirect('/')
    else
        return (
            <main>
                <div className={style.wrapper}>
                    <LoginForm />
                </div>
            </main>
        )
}
