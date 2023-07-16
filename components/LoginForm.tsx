'use client'

import style from '../styles/login-form.module.css'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const username = e.currentTarget.username.value
        const password = e.currentTarget.password.value

        const res = await fetch(`/api/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        if (res.ok) router.replace('/')
        else console.log('Something went wrong')
    }

    return (
        <form className={style.form} onSubmit={handleSubmit}>
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
    )
}
