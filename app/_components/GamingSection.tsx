import style from './gaming-section.module.css'

import Link from 'next/link'
import Image from 'next/image'

import { ComposedProductInfo } from '@/types/product'

interface GamingProps {
    products: ComposedProductInfo[]
}

export default function GamingSection({ products }: GamingProps) {
    return (
        <section className={style.section}>
            <div className={style.header}>
                <div className={style.title}>
                    <span>Desktops - Laptops - Graphic Cards and more..</span>
                    <h4>The Best Gaming Offers</h4>
                </div>
                <Link
                    className={style.link}
                    href='/search/a,e,i,o,u?is_gamer=1&page=1'
                    prefetch={false}
                >
                    <span>Gaming Offers</span>
                </Link>
            </div>
            <div className={style.grid}>
                {products.slice(0, 6).map(product => (
                    <Link
                        key={product.details.id}
                        className={style.product}
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
                ))}
            </div>
        </section>
    )
}
