import style from '../styles/gaming-section.module.css'

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
                <Image
                    className={style.gamingImg}
                    src={'/gaming.webp'}
                    alt='Gaming products'
                    height={500}
                    width={500}
                    quality='100'
                    priority
                />
                <Link href='/' className={style.link}>
                    <span>Gaming Offers</span>
                </Link>
            </div>
            <div className={style.grid}>
                {products.slice(0, 6).map(product => (
                    <Link
                        key={product.details.id}
                        href={`/product/${product.details.id}`}
                        className={style.product}
                        prefetch={false}
                    >
                        <Image
                            src={product.default_img.url}
                            alt={product.default_img.description}
                            width={250}
                            height={250}
                            quality='25'
                        />
                    </Link>
                ))}
            </div>
        </section>
    )
}
