'use client'

import { useContext } from 'react'
import style from './page.module.css'
import AuthContext from '@/context/AuthContext'

export default function Login() {
    const { user, loginUser } = useContext(AuthContext)
    console.log(user)

    return (
        <main>
            <div className={style.wrapper}>
                <form className={style.form} onSubmit={loginUser}>
                    <h1>Log In</h1>
                    <div className={style.formField}>
                        <label htmlFor='username'>Username: </label>
                        <input type='text' name='username' id='username' />
                    </div>
                    <div className={style.formField}>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' name='password' id='password' />
                    </div>
                    <button type='submit'>Log In</button>
                </form>
            </div>
        </main>
    )
}
