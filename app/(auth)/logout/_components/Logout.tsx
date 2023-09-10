'use client'

import style from './logout.module.css'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Logout() {
    const router = useRouter()
    const [state, setState] = useState('Logging out...')

    useEffect(() => {
        ;(async () => {
            const res = await fetch('/api/auth/logout', {
                method: 'post'
            })

            if (res.ok) setState('Successfully Logged Out')
            else setState('Something Went Wrong... ')

            setTimeout(() => router.refresh(), 1500)
        })()
    }, [router])

    return (
        <main className={style.logout}>
            <div className={style.wrapper}>
                <h1>{state}</h1>
                {state === 'Successfully Logged Out' && 'Redirecting...'}
            </div>
        </main>
    )
}
