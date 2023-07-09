import Link from 'next/link'
import style from '../styles/offers.module.css'

import { CardProductDetails } from '@/types/products'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'

interface OffersProps {
    products: CardProductDetails[]
}

// SECTION SHOWING 3 RANDOM OFFERS
const Offers = ({ products }: OffersProps) => {
    return (
        <section className={style.section}>
            <div className={style.grid}>
                {products.slice(0, 3).map(product => (
                    <Link
                        key={product.details.id}
                        href={`/product/${product.details.id}`}
                        className={style.product}
                    >
                        <Image
                            src={product.image.url}
                            alt={product.image.description}
                            width={150}
                            height={150}
                            quality='25'
                        />
                    </Link>
                ))}
            </div>
            <div className={style.header}>
                <div>
                    <span>Only for a few hours</span>
                    <h4>Take Advantage Of This Offers</h4>
                </div>
                <Link href='/' className={style.link}>
                    <span>More Offers</span>
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
        </section>
    )
}

export default Offers
