import style from '../styles/search-card.module.css'

import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons'

import { ComposedProductInfo } from '@/types/products'
import { CustomerData } from '@/types/users'
import { getInstallments } from '@/helpers/getInstallments'
import { getDiscount } from '@/helpers/getDiscount'

interface SearchCardProps {
    product: ComposedProductInfo
    user: CustomerData
}

export default function SearchCard({ product, user }: SearchCardProps) {
    return (
        <div className={style.wrapper}>
            <Link
                href={`/product/${product.details.id}`}
                className={style.card}
                aria-label={product.details.name}
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
                        {product.best_seller && (
                            <span className={style.bestSeller}>
                                Best Seller
                            </span>
                        )}
                        <span className={style.discount}>
                            {getDiscount(
                                product.details.price,
                                product.details.offer_price
                            )}
                            % OFF
                        </span>
                    </div>
                    <div className={style.offer}>
                        <span>$ {product.details.price}</span>
                        <span>$ {product.details.offer_price}</span>
                        <span>
                            Available in{' '}
                            <span>
                                {getInstallments(
                                    product.details.installments,
                                    product.details.offer_price
                                )}
                            </span>
                        </span>
                    </div>
                </div>
            </Link>
            {user && (
                <div className={style.options}>
                    <button aria-label='Add to Favorites'>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button aria-label='Add to Cart'>
                        <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                </div>
            )}
        </div>
    )
}
