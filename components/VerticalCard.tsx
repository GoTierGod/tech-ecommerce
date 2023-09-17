import style from './vertical-card.module.css'

import Image from 'next/image'
import Link from 'next/link'

import { ComposedProductInfo } from '@/types/product'
import { respectLineBreaks } from '@/utils/formatting/respectLineBreaks'
import { getProductDiscount } from '@/utils/product/getProductDiscount'
import { priceFormatter } from '@/utils/formatting/priceFormatter'

interface VerticalCardProps {
    product: ComposedProductInfo
}

export default function VerticalCard({ product }: VerticalCardProps) {
    return (
        <Link
            href={`/product/${product.details.id}`}
            className={style.card}
            prefetch={false}
        >
            <header className={style.image}>
                <Image
                    src={product.default_img.url}
                    alt={product.default_img.description}
                    height={250}
                    width={250}
                    quality='25'
                />
            </header>
            <div className={style.details}>
                <div className={style.offer}>
                    <p className={style.price}>
                        <span>{priceFormatter(product.details.price)}</span>
                        <span>
                            {priceFormatter(product.details.offer_price)}
                        </span>
                    </p>
                    <span className={style.discount}>
                        {getProductDiscount(
                            product.details.price,
                            product.details.offer_price
                        )}
                    </span>
                </div>
                <h3 className={style.name}>{product.details.name}</h3>
                {product.best_seller ? (
                    <span className={style.bestSeller}>Best Seller</span>
                ) : (
                    <span className={style.stock}>
                        {product.details.stock} In Stock
                    </span>
                )}
                <p className={style.description}>
                    {respectLineBreaks(product.details.description)}
                </p>
            </div>
        </Link>
    )
}
