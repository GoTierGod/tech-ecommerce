import style from './horizontal-card.module.css'

import Link from 'next/link'
import Image from 'next/image'

import { ComposedProductInfo } from '@/types/product'
import { priceFormatter } from '@/utils/formatting/priceFormatter'
import { getProductDiscount } from '@/utils/product/getProductDiscount'
import { getProductInstallments } from '@/utils/product/getProductInstallments'

interface HorizontalCardProps {
    product: ComposedProductInfo
}

export default function HorizontalCard({ product }: HorizontalCardProps) {
    return (
        <Link
            className={style.card}
            href={`/product/${product.details.id}`}
            prefetch={false}
        >
            <div className={style.image}>
                <Image
                    src={product.default_img.url}
                    alt={product.default_img.description}
                    width={250}
                    height={250}
                    quality='25'
                />
            </div>
            <div className={style.details}>
                <h3 className={style.name}>{product.details.name}</h3>
                <div className={style.badges}>
                    {product.best_seller ? (
                        <span className={style.bestSeller}>Best Seller</span>
                    ) : (
                        <span className={style.stock}>
                            {product.details.stock} In Stock
                        </span>
                    )}
                    <span className={style.discount}>
                        {getProductDiscount(
                            product.details.price,
                            product.details.offer_price
                        )}
                    </span>
                </div>
                <div className={style.offer}>
                    <span>{priceFormatter(product.details.price)}</span>
                    <span>{priceFormatter(product.details.offer_price)}</span>
                    <span>
                        Available in{' '}
                        <span>
                            {getProductInstallments(
                                product.details.installments,
                                product.details.offer_price
                            )}
                        </span>
                    </span>
                </div>
            </div>
        </Link>
    )
}
