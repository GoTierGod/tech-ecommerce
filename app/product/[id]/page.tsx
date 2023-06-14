import style from './page.module.css'

import { getData } from '@/helpers/getData'
import { CardProductDetails } from '@/types/products'

const product = ({ params }: { params: { id: string } }) => {
    const { id } = params

    return (
        <main>
            <div className={style.product}>
                <h1>Product ID: {id}</h1>
            </div>
        </main>
    )
}

export const generateStaticParams = async () => {
    const products: CardProductDetails[] = await getData(
        'https://ft-drf-api.vercel.app/api/products'
    )

    return products.map(product => ({ id: String(product.details.id) }))
}

export default product
