import ProductRows from '@/components/ProductRows'
import style from './page.module.css'

import { getData } from '@/helpers/getData'

export default async function Search({ params }: { params: { slug: string } }) {
    const { slug: search } = params
    const cleanedSearch = search.replace(/(\%20)+/g, ',')

    const products = await getData(
        `https://ft-drf-api.vercel.app/api/search/${cleanedSearch}`
    )

    return (
        <main>
            <div className={style.wrapper}>
                <h1>{cleanedSearch}</h1>
            </div>
        </main>
    )
}
