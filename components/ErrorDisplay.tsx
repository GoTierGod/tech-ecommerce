'use client'

import style from './error-display.module.css'

interface ErrorDisplayProps {
    status: number
    statusText: string
    action: Function
    actionText: string
    message: string
}

export default function ErrorDisplay({
    status,
    statusText,
    action,
    actionText,
    message
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
