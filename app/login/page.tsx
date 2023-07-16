import style from './page.module.css'
import Cookies from 'js-cookie'
import { redirect } from 'next/navigation'

export default function Login() {
    if (Cookies.get('authTokens')) redirect('/')
    else
        return (
            <main>
                <div className={style.wrapper}>
                    <form className={style.form}>
                        <h1>Log In</h1>
                        <div className={style.formField}>
                            <label htmlFor='username'>Username: </label>
                            <input type='text' name='username' id='username' />
                        </div>
                        <div className={style.formField}>
                            <label htmlFor='password'>Password: </label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                            />
                        </div>
                        <button type='submit'>Log In</button>
                    </form>
                </div>
            </main>
        )
}
