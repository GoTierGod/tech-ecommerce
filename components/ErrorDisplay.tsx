'use client'

import style from '../styles/error-display.module.css'

interface ErrorDisplayProps {
    message: string
    status: number
    statusText: string
    action: Function
    actionText: string
}

export default function ErrorDisplay({
    message,
    status,
    statusText,
    action,
    actionText
}: ErrorDisplayProps) {
    return (
        <div className={style.wrapper}>
            <div>
                <h1>{status}</h1>
                <span></span>
                <h2>{statusText}</h2>
            </div>
            <p>{message}</p>
            <button onClick={() => action()}>{actionText}</button>
        </div>
    )
}
