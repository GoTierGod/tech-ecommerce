import style from '../styles/vertical-card.module.css'

import Image from 'next/image'
import Link from 'next/link'

import { ComposedProductInfo } from '@/types/product'
import { respectLineBreaks } from '@/utils/respectLineBreaks'
import { getDiscount } from '@/utils/getDiscount'
import { priceStringNormalizer } from '@/utils/priceStringNormalizer'

interface VerticalCardProps {
    product: ComposedProductInfo
}

export default function VerticalCard({ product }: VerticalCardProps) {
    return (
        <Link href={`/product/${product.details.id}`} className={style.card}>
            <div className={style.image}>
                <Image
                    src={product.default_img.url}
                    alt={product.default_img.description}
                    height={250}
                    width={250}
                    quality='25'
                />
            </div>
            <div className={style.details}>
                <div className={style.offer}>
                    <div className={style.price}>
                        <span>
                            {priceStringNormalizer(product.details.price)}
                        </span>
                        <span>
                            {priceStringNormalizer(product.details.offer_price)}
                        </span>
                    </div>
                    <span className={style.discount}>
                        {' '}
                        {getDiscount(
                            product.details.price,
                            product.details.offer_price
                        )}
                        % OFF
                    </span>
                </div>
                <h4 className={style.name}>{product.details.name}</h4>
                {product.best_seller && (
                    <span className={style.bestSeller}>Best Seller</span>
                )}
                <p className={style.description}>
                    {respectLineBreaks(product.details.description)}
                </p>
            </div>
        </Link>
    )
}
