import Image from 'next/image'
import style from '../styles/vertical-card.module.css'

import { CardProductDetails } from '@/types/products'
import Link from 'next/link'
import { formatPrice } from '@/helpers/formatPrice'
import { getDiscount } from '@/helpers/getDiscount'

interface VerticalCardProps {
    product: CardProductDetails
}

// VERTICAL CARD FOR PRODUCT DETAILS
const VerticalCard = ({ product }: VerticalCardProps) => {
    return (
        <Link href={`/product/${product.details.id}`} className={style.card}>
            <div className={style.image}>
                <Image
                    src={product.image.url}
                    alt={product.image.description}
                    height={250}
                    width={250}
                    quality='25'
                />
            </div>
            <div className={style.details}>
                <div className={style.offer}>
                    <div>
                        <span>$ {formatPrice(product.details.price)}</span>
                        <span>
                            $ {formatPrice(product.details.offer_price)}
                        </span>
                    </div>
                    <span>
                        {' '}
                        {getDiscount(
                            product.details.price,
                            product.details.offer_price
                        )}
                        % OFF
                    </span>
                </div>
                <h4 className={style.name}>{product.details.name}</h4>
                <span className={style.bestSeller}>Best Seller</span>
                <p className={style.description}>
                    {product.details.description}
                </p>
            </div>
        </Link>
    )
}

export default VerticalCard
