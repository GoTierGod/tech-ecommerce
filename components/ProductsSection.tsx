import style from '../styles/products-section.module.css'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'

import { CardProductDetails } from '@/types/products'
import VerticalCard from './VerticalCard'

interface ProductRowsProps {
    title: string
    products: CardProductDetails[]
    url: string
}

// A GRID MADE OF VERTICAL CARDS
export default function ProductsSection({
    title,
    products,
    url
}: ProductRowsProps) {
    return (
        <section className={style.section}>
            <div className={style.header}>
                <h4>{title}</h4>
                <Link href={url} className={style.topLink}>
                    <span>See More</span>
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <div className={style.grid}>
                {products.map(product => (
                    <VerticalCard key={product.details.id} product={product} />
                ))}
            </div>
            <Link href={url} className={style.bottomLink}>
                <span>See More</span>
                <FontAwesomeIcon icon={faRightLong} />
            </Link>
        </section>
    )
}
