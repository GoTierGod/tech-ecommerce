import style from '../styles/SearchCard.module.css'

import Link from 'next/link'

import { CardProductDetails } from '@/types/products'
import Image from 'next/image'
import { getInstallments } from '@/helpers/getInstallments'
import { getStars } from '@/helpers/getStars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons'

const SearchCard = ({ product }: { product: CardProductDetails }) => {
    return (
        <Link href={`/product/${product.details.id}`} className={style.card}>
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
                <div className={style.name}>
                    <h4>{product.details.name}</h4>
                    <span>Best Seller</span>
                </div>
                <div className={style.offer}>
                    <span>{product.details.price}</span>
                    <span>{product.details.offer_price}</span>
                    <span>
                        Available in{' '}
                        {getInstallments(
                            product.details.installments,
                            product.details.offer_price
                        )}
                    </span>
                </div>
                <div className={style.options}>
                    <button>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default SearchCard
