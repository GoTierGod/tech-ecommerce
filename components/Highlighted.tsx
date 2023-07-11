import Image from 'next/image'
import style from '../styles/highlighted.module.css'

import { CardProductDetails } from '@/types/products'
import Link from 'next/link'

interface HighlightedProps {
    products: CardProductDetails[]
}

// SECTION SHOWING TWO HIGHLIGHTED CATEGORIES AND ONE PRODUCT FOR EACH ONE
const Highlighted = ({ products }: HighlightedProps) => {
    return (
        <section className={style.section}>
            {products.map(product => (
                <article key={product.details.id} className={style.card}>
                    <div className={style.header}>
                        <div>
                            <span>The best offers in</span>
                            <h4>{product.details.category.title}</h4>
                        </div>
                        <Link href='/' className={style.link}>
                            <span>{product.details.category.title}</span>
                        </Link>
                    </div>
                    <Link
                        href={`/product/${product.details.id}`}
                        className={style.image}
                    >
                        <Image
                            src={product.image.url}
                            alt={product.image.description}
                            width={250}
                            height={250}
                            quality='25'
                        />
                    </Link>
                </article>
            ))}
        </section>
    )
}

export default Highlighted
