import style from './page.module.css'

import ProductRows from '@/components/ProductRows'
import { CardProductDetails } from '@/types/products'
import { getData } from '@/helpers/getData'
import Offers from '@/components/Offers'
import Highlighted from '@/components/Highlighted'
import Gaming from '@/components/Gaming'

export const metadata = {
    title: 'Home | Tech'
}

export default async function Home() {
    const laptops: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=laptops&limit=6`
    )
    const headphones: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=headphones&limit=6`
    )
    const smartphones: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=smartphones&limit=6`
    )

    const offers: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=monitors&limit=3`
    )

    const highlightedOne: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=smartphones&limit=1`
    )
    const highlightedTwo: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=headphones&limit=1`
    )

    const gaming: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?is_gamer=true&limit=6`
    )

    return (
        <main>
            <div className={style.home}>
                <Offers products={offers} />
                <ProductRows title='Laptops' products={laptops} url='/' />
                <Highlighted
                    products={[highlightedOne[0], highlightedTwo[0]]}
                />
                <ProductRows title='Headphones' products={headphones} url='/' />
                <Gaming products={gaming} />
                <ProductRows
                    title='Smartphones'
                    products={smartphones}
                    url='/'
                />
            </div>
        </main>
    )
}
