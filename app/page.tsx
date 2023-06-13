import styles from './page.module.css'

import ProductRows from '@/components/ProductRows'
import { CardProductDetails } from '@/types/products'
import { getData } from '@/helpers/getData'
import Offers from '@/components/Offers'
import Highlighted from '@/components/Highlighted'
import Gaming from '@/components/Gaming'

export default async function Home() {
    const laptops: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=laptops&limit=6`
    )

    const offers: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=monitors&limit=3`
    )

    const smartphone: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=smartphones&limit=1`
    )
    const headphones: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=headphones&limit=1`
    )

    const gaming: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=laptops&limit=6`
    )

    return (
        <main className={styles.main}>
            <div>
                <Offers products={offers} />
                <ProductRows title='Laptops' products={laptops} url='/' />
                <Highlighted products={[smartphone[0], headphones[0]]} />
                <ProductRows title='Laptops' products={laptops} url='/' />
                <Gaming products={gaming} />
                <ProductRows title='Laptops' products={laptops} url='/' />
            </div>
        </main>
    )
}
