import style from './products-section.module.css'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'

import { ComposedProductInfo } from '@/types/product'
import VerticalCard from './VerticalCard'

interface ProductsSectionProps {
    title: string
    products: ComposedProductInfo[]
    url: string
}

export default function ProductsSection({
    title,
    products,
    url
}: ProductsSectionProps) {
    return (
        <section className={style.section}>
            <div className={style.header}>
                <h4>{title}</h4>
                <Link href={url} className={style.link} prefetch={false}>
                    {title}
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <div className={style.grid}>
                {products.map(product => (
                    <VerticalCard key={product.details.id} product={product} />
                ))}
            </div>
        </section>
    )
}
