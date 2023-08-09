import style from './page.module.css'

import ProductsSection from '@/components/ProductsSection'
import { CardProductDetails } from '@/types/products'
import { getData } from '@/helpers/getData'
import OffersSection from '@/components/OffersSection'
import HighlightedSection from '@/components/HighlightedSection'
import { Metadata } from 'next'
import GamingSection from '@/components/GamingSection'

export const metadata: Metadata = {
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
                <OffersSection products={offers} />
                <ProductsSection title='Laptops' products={laptops} url='/' />
                <HighlightedSection
                    products={[highlightedOne[0], highlightedTwo[0]]}
                />
                <ProductsSection
                    title='Headphones'
                    products={headphones}
                    url='/'
                />
                <GamingSection products={gaming} />
                <ProductsSection
                    title='Smartphones'
                    products={smartphones}
                    url='/'
                />
            </div>
        </main>
    )
}
