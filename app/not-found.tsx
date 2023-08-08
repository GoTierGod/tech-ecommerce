import { Metadata } from 'next'
import style from './not-found.module.css'

export default async function NotFound() {
    return (
        <main className={style.notFound}>
            <h1>404</h1>
            <span></span>
            <h2>Not Found</h2>
        </main>
    )
}
