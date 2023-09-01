import style from './highlighted-section.module.css'

import Image from 'next/image'
import Link from 'next/link'

import { ComposedProductInfo } from '@/types/product'

interface HighlightedProps {
    products: ComposedProductInfo[]
}

export default function HighlightedSection({ products }: HighlightedProps) {
    return (
        <section className={style.section}>
            {products.map(product => (
                <article key={product.details.id} className={style.card}>
                    <div className={style.header}>
                        <div className={style.title}>
                            <span>The best offers in</span>
                            <h4>{product.details.category.title}</h4>
                        </div>
                        <Link
                            className={style.link}
                            href={`/search/${product.details.category.title}`}
                            prefetch={false}
                        >
                            <span>{product.details.category.title}</span>
                        </Link>
                    </div>
                    <Link
                        className={style.image}
                        href={`/product/${product.details.id}`}
                        prefetch={false}
                    >
                        <Image
                            src={product.default_img.url}
                            alt={product.default_img.description}
                            width={250}
                            height={250}
                            quality='50'
                        />
                    </Link>
                </article>
            ))}
        </section>
    )
}