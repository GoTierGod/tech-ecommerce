import style from './not-found.module.css'

export default function NotFound() {
    return (
        <main className={style.notFound}>
            <h1>404</h1>
            <span></span>
            <h2>{`There are no products matching this ID`}</h2>
        </main>
    )
}
