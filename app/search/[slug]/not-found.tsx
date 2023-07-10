import style from './not-found.module.css'

export default function NotFound() {
    return (
        <main className={style.notFound}>
            <h1>{`There's no products that match your search`}</h1>
            <div>
                <h2>Try these steps</h2>
                <ul>
                    <li>Check the spelling of the words.</li>
                    <li>Use more generic words or fewer words.</li>
                    <li>Browse the categories to find a similar product.</li>
                </ul>
            </div>
        </main>
    )
}
