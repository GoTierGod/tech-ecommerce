import Image from 'next/image'
import style from '../styles/verticalCard.module.css'

import { CardProductDetails } from '@/types/products'
import Link from 'next/link'

interface VerticalCardProps {
    product: CardProductDetails
}

const formatPrice = (value: string) => Number(value).toFixed(2)

const getDiscount = (price: string, offer: string) =>
    (Number(price) / Number(offer)) * 100 - 100

// VERTICAL CARD FOR PRODUCT DETAILS
const VerticalCard = ({ product }: VerticalCardProps) => {
    return (
        <Link href={`/product/${product.details.id}`}>
            <article className={style.card}>
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
                            -{' '}
                            {getDiscount(
                                product.details.price,
                                product.details.offer_price
                            )}
                            %
                        </span>
                    </div>
                    <h4 className={style.name}>{product.details.name}</h4>
                    {Number(product.details.price) >= 50 ? (
                        <span className={style.freeShipping}>
                            Free Shipping
                        </span>
                    ) : (
                        <span className={style.normalShipping}>
                            Normal Shipping
                        </span>
                    )}
                    <p className={style.description}>
                        {product.details.description}
                    </p>
                </div>
            </article>
        </Link>
    )
}

export default VerticalCard
