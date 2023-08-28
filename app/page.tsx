import style from './page.module.css'

import ProductsSection from '@/components/ProductsSection'
import { ComposedProductInfo } from '@/types/product'
import { getData } from '@/utils/data/getData'
import OffersSection from '@/app/_components/OffersSection'
import HighlightedSection from '@/app/_components/HighlightedSection'
import { Metadata } from 'next'
import GamingSection from '@/app/_components/GamingSection'
import { getUser } from '@/utils/data/getUser'

export const metadata: Metadata = {
    title: 'Home | Tech'
}

export default async function Home() {
    const laptops: ComposedProductInfo[] = await getData(
        `/api/products/?category=laptops&limit=6`
    )
    const headphones: ComposedProductInfo[] = await getData(
        `/api/products/?category=headphones&limit=6`
    )
    const smartphones: ComposedProductInfo[] = await getData(
        `/api/products/?category=smartphones&limit=6`
    )

    const offers: ComposedProductInfo[] = await getData(
        `/api/products/?category=monitors&limit=3`
    )

    const highlightedOne: ComposedProductInfo[] = await getData(
        `/api/products/?category=smartphones&limit=1`
    )
    const highlightedTwo: ComposedProductInfo[] = await getData(
        `/api/products/?category=headphones&limit=1`
    )

    const gaming: ComposedProductInfo[] = await getData(
        `/api/products/?is_gamer=true&limit=6`
    )

    const user = await getUser()

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
