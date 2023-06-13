import styles from './page.module.css'

import ProductRows from '@/components/ProductRows'
import { CardProductDetails } from '@/types/products'
import { getData } from '@/helpers/getData'
import Offers from '@/components/Offers'

export default async function Home() {
    const laptops: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=laptops&limit=6`
    )

    const offers: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=smartphones&limit=3`
    )

    return (
        <main className={styles.main}>
            <div>
                <Offers products={offers} />
                <ProductRows title='Laptops' products={laptops} url='/' />
            </div>
        </main>
    )
}
