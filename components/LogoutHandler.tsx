'use client'

import { useEffect, useState } from 'react'

export default function LogoutHandler() {
    const [state, setState] = useState('Logging out...')

    useEffect(() => {
        ;(async () => {
            const res = await fetch('/api/auth/logout', {
                method: 'post'
            })

            if (res.ok) setState('Successfully Log Out')
            else setState('Something Went Wrong...')
        })()
    }, [])

    return <h1>{state}</h1>
}
