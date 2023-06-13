import Link from 'next/link'
import style from '../styles/gaming.module.css'

import { CardProductDetails } from '@/types/products'
import Image from 'next/image'

interface GamingProps {
    products: CardProductDetails[]
}

// SECTION SHOWING 6 GAMING PRODUCTS
const Gaming = ({ products }: GamingProps) => {
    return (
        <section className={style.section}>
            <div className={style.header}>
                <div>
                    <span>Desktops - Laptops - Graphic Cards and more..</span>
                    <h4>The Best Gaming Offers</h4>
                </div>
                <Link href='/' className={style.link}>
                    <span>Gaming Offers</span>
                </Link>
            </div>
            <div className={style.grid}>
                {products.map(product => (
                    <Link
                        key={product.details.id}
                        href={`/product/${product.details.id}`}
                        className={style.product}
                    >
                        <Image
                            src={product.image.url}
                            alt={product.image.description}
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

export default Gaming
