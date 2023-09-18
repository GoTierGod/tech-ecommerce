'use client'

import style from './error.module.css'

import { useEffect, useState } from 'react'

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const [APIError, setAPIError] = useState(
        null as {
            status: number
            message: string
        } | null
    )

    useEffect(() => {
        try {
            setAPIError(
                JSON.parse(error.message) as {
                    status: number
                    message: string
                }
            )
        } catch (err) {
            setAPIError(null)
        }
    }, [error, APIError])

    return APIError ? (
        <main className={style.error}>
            <h1>{APIError.status}</h1>
            <span></span>
            <h2>{APIError.message}</h2>
        </main>
    ) : (
        <main className={style.error}>
            <h1>{error.name}</h1>
            <span></span>
            <h2>{error.message}</h2>
        </main>
    )
}
