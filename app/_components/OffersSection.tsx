import style from './offers-section.module.css'

import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'

import { ComposedProductInfo } from '@/types/product'
import { priceStringFormatter } from '@/utils/formatting/priceStringFormatter'
import { getProductDiscount } from '@/utils/products/getProductDiscount'

interface OffersProps {
    products: ComposedProductInfo[]
}

export default function OffersSection({ products }: OffersProps) {
    return (
        <section className={style.section}>
            <div className={style.grid}>
                {products.slice(0, 3).map(product => (
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
                        <span>
                            {priceStringFormatter(product.details.offer_price)}
                            <span>
                                {getProductDiscount(
                                    product.details.price,
                                    product.details.offer_price
                                )}
                            </span>
                        </span>
                    </Link>
                ))}
            </div>
            <div className={style.header}>
                <div className={style.title}>
                    <span>Only for a few hours</span>
                    <h4>Take Advantage Of This Offers</h4>
                </div>
                <Link
                    className={style.link}
                    href='/search/a,b,c,d,e?page=1'
                    prefetch={false}
                >
                    See Offers
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
        </section>
    )
}
