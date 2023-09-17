import style from './gaming-section.module.css'

import Link from 'next/link'
import Image from 'next/image'

import { ComposedProductInfo } from '@/types/product'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { priceFormatter } from '@/utils/formatting/priceFormatter'
import { getProductDiscount } from '@/utils/product/getProductDiscount'

interface GamingProps {
    products: ComposedProductInfo[]
}

export default function GamingSection({ products }: GamingProps) {
    return (
        <section className={style.section}>
            <header className={style.header}>
                <div className={style.title}>
                    <span>Desktops - Laptops - Graphic Cards and more..</span>
                    <h4>The Best Gaming Offers</h4>
                </div>
                <Link
                    className={style.link}
                    href='/search/a,e,i,o,u?is_gamer=1&page=1'
                    prefetch={false}
                >
                    Gaming Offers
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </header>
            <div className={style.grid}>
                {products.slice(0, 6).map(product => (
                    <Link
                        key={product.details.id}
                        className={style.product}
                        href={`/product/${product.details.id}`}
                        prefetch={false}
                    >
                        <Image
                            className={style.mainImg}
                            src={product.default_img.url}
                            alt={product.default_img.description}
                            width={250}
                            height={250}
                            quality='50'
                        />
                        <div className={style.content}>
                            <Image
                                className={style.secImg}
                                src={product.default_img.url}
                                alt={product.default_img.description}
                                width={250}
                                height={250}
                                quality='25'
                            />
                            <div>
                                <span className={style.price}>
                                    {priceFormatter(
                                        product.details.offer_price
                                    )}
                                </span>
                                <span className={style.discount}>
                                    {getProductDiscount(
                                        product.details.price,
                                        product.details.offer_price
                                    )}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
