import style from './horizontal-card.module.css'

import Link from 'next/link'
import Image from 'next/image'

import { ComposedProductInfo } from '@/types/product'
import { priceStringFormatter } from '@/utils/formatting/priceStringFormatter'
import { getProductDiscount } from '@/utils/products/getProductDiscount'
import { getProductInstallments } from '@/utils/products/getProductInstallments'

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
                <h4 className={style.name}>{product.details.name}</h4>
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
                    <span>{priceStringFormatter(product.details.price)}</span>
                    <span>
                        {priceStringFormatter(product.details.offer_price)}
                    </span>
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
