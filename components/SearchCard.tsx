import style from '../styles/SearchCard.module.css'

import Link from 'next/link'

import { CardProductDetails } from '@/types/products'
import Image from 'next/image'
import { getInstallments } from '@/helpers/getInstallments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { getDiscount } from '@/helpers/getDiscount'

const SearchCard = ({ product }: { product: CardProductDetails }) => {
    return (
        <div className={style.wrapper}>
            <Link
                href={`/product/${product.details.id}`}
                className={style.card}
            >
                <div className={style.image}>
                    <Image
                        src={product.image.url}
                        alt={product.image.description}
                        width={250}
                        height={250}
                        quality='25'
                    />
                </div>
                <div className={style.details}>
                    <div>
                        <h4 className={style.name}>{product.details.name}</h4>
                        <span>Offered by {product.details.brand.name}</span>
                    </div>
                    <div className={style.badges}>
                        <span className={style.bestSeller}>Best Seller</span>
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
            <div className={style.options}>
                <button>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
                <button>
                    <FontAwesomeIcon icon={faCartPlus} />
                </button>
            </div>
        </div>
    )
}

export default SearchCard
