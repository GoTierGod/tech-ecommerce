import style from './page.module.css'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import { getUser } from '@/helpers/getUser'
import { CustomerData } from '@/types/users'

export default async function Login() {
    const user: CustomerData = await getUser()

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
