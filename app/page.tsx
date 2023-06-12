import styles from './page.module.css'

import ProductRows from '@/components/ProductRows'
import { CardProductDetails } from '@/types/products'
import { getData } from '@/helpers/getData'

export default async function Home() {
    const products: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?category=laptops&limit=6`
    )

    return (
        <main className={styles.main}>
            <h1>Hello World</h1>
            <ProductRows title='Laptops' products={products} url='/' />
        </main>
    )
}
