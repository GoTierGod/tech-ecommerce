'use client'

import { useEffect, useState } from 'react'

export default function UserLogout() {
    const [state, setState] = useState('Logging out...')

    useEffect(() => {
        ;(async () => {
            const res = await fetch('/api/auth/logout', {
                method: 'post'
            })

            if (res.ok) setState('Successfully Logged Out')
            else setState('Something Went Wrong... ')
        })()
    }, [])

    return <h1>{state}</h1>
}
