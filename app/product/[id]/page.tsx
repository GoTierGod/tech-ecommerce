import style from './page.module.css'

import { ComposedProductInfo } from '@/types/product'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBox,
    faShieldAlt,
    faStar,
    faTruck
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'

import VerticalCard from '@/components/VerticalCard'
import ProductRows from '@/components/ProductsSection'
import ProductImages from '@/components/ProductImages'
import { getData } from '@/utils/data/getData'
import { getProductStars } from '@/utils/products/getProductStars'
import { getProductDeliveryDay } from '@/utils/products/getProductDeliveryDay'
import { getProductInstallments } from '@/utils/products/getProductInstallments'
import { notFound } from 'next/navigation'
import { respectLineBreaks } from '@/utils/formatting/respectLineBreaks'
import { getUser } from '@/utils/data/getUser'
import { CustomerData } from '@/types/users'

import visaLogo from '../../../public/images/payments/visa.svg'
import mastercardLogo from '../../../public/images/payments/mastercard.svg'
import americanExpressLogo from '../../../public/images/payments/american-express.svg'
import dinersClubLogo from '../../../public/images/payments/diners-club-international.svg'
import { Metadata } from 'next'
import { priceStringFormatter } from '@/utils/formatting/priceStringFormatter'

const paymentLogos = [
    { src: visaLogo, alt: 'Visa' },
    { src: mastercardLogo, alt: 'Mastercard' },
    { src: americanExpressLogo, alt: 'American Express' },
    { src: dinersClubLogo, alt: 'Diners Club International' }
]

export const metadata: Metadata = {
    title: 'Product | Tech'
}

export default async function Product({ params }: { params: { id: string } }) {
    const { id } = params

    const product: ComposedProductInfo | false = await getData(
        `https://ft-drf-api.vercel.app/api/products/${id}`
    )

    if (!product) return notFound()
    metadata.title = `${product.details.name} | Tech`

    const brandProducts: ComposedProductInfo[] | false = await getData(
        `https://ft-drf-api.vercel.app/api/products?brand=${product.details.brand.name}&limit=5`
    )
    const relatedProducts: ComposedProductInfo[] | false = await getData(
        `https://ft-drf-api.vercel.app/api/products?brand=${product.details.brand.name}&limit=6`
    )

    if (!brandProducts || !relatedProducts) return notFound()

    const user: CustomerData = await getUser()

    const content = (
        <div className={style.content}>
            {/* ------------------------- OFFER -------------------------  */}
            <div className={style.offer}>
                <span>{priceStringFormatter(product.details.price)}</span>
                <span>{priceStringFormatter(product.details.offer_price)}</span>
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
            {/* ------------------------- OPTIONS -------------------------  */}
            <div className={style.options}>
                <span>Stock: {product.details.stock}</span>
                <Link href='/'>
                    <span>Buy Now</span>
                </Link>
                <Link href='/'>
                    <span>Add to Cart</span>
                </Link>
            </div>
            {/* ------------------------- DELIVERY -------------------------  */}
            <div className={style.delivery}>
                <h3>Delivery</h3>
                <span>
                    <FontAwesomeIcon icon={faTruck} /> It arrives for free this{' '}
                    {getProductDeliveryDay()}
                </span>
                <span>
                    <FontAwesomeIcon icon={faBox} />
                    Pick up your package for free starting from{' '}
                    {getProductDeliveryDay()}
                </span>
            </div>
            {/* ------------------------- BRAND INFO -------------------------  */}
            <div className={style.brand}>
                <h3>
                    Offered by <span>{product.details.brand.name}</span>
                </h3>
                <p>{product.details.brand.description}</p>
                <Link href={'/'}>See more of this brand</Link>
            </div>
            {/* ------------------------- WARRANTY AND POINTS -------------------------  */}
            <div className={style.wp}>
                <div>
                    <h3>Warranty</h3>
                    <span>
                        <FontAwesomeIcon icon={faShieldAlt} />{' '}
                        {product.details.months_warranty} Months
                    </span>
                    <Link href='/'>
                        <span>Read More</span>
                    </Link>
                </div>
                <div>
                    <h3>FT Points</h3>
                    <span>
                        <FontAwesomeIcon icon={faStar} />{' '}
                        {Number(product.details.price)} Points
                    </span>
                    <Link href='/'>
                        <span>Log In</span>
                    </Link>
                </div>
            </div>
            {/* ------------------------- PAYMENT -------------------------  */}
            <div className={style.payment}>
                <h3>Payment Methods</h3>
                <div>
                    <div>
                        <h4>Credit cards</h4>
                        <h5>
                            Available in{' '}
                            <span>
                                {getProductInstallments(
                                    product.details.installments,
                                    product.details.offer_price
                                )}
                            </span>
                        </h5>
                    </div>
                    <div>
                        {paymentLogos.map(pay => (
                            <Image key={pay.alt} src={pay.src} alt={pay.alt} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.product}>
                    <div className={style.leftContent}>
                        {/* ------------------------- HEADER -------------------------  */}
                        <div className={style.header}>
                            <div>
                                <h2>{product.details.name}</h2>
                                {product.best_seller && (
                                    <span className={style.bestSeller}>
                                        Best Seller
                                    </span>
                                )}
                            </div>
                            <div className={style.rating}>
                                <span>
                                    {getProductStars(
                                        product.reviews_counter,
                                        product.rating
                                    )}
                                </span>
                                <span>
                                    {product.rating || '5.0'}{' '}
                                    <FontAwesomeIcon icon={faStar} />
                                </span>
                            </div>
                        </div>
                        {/* ------------------------- IMAGES -------------------------  */}
                        <ProductImages images={product.images} />
                        {/* ------------------------- MORE BRAND PRODUCTS -------------------------  */}
                        <div className={style.brandProducts}>
                            <div>
                                <h3>More of {product.details.brand.name}</h3>
                            </div>
                            <div>
                                {brandProducts
                                    .filter(
                                        product =>
                                            product.details.id.toString() !== id
                                    )
                                    .map(product => (
                                        <VerticalCard
                                            key={product.details.id}
                                            product={product}
                                        />
                                    ))}
                            </div>
                        </div>
                        {/* ------------------------- CATEGORY -------------------------  */}
                        <div className={style.category}>
                            <h3>See more in this category</h3>
                            <Link href='/'>
                                <span>{product.details.category.title}</span>
                            </Link>
                        </div>
                        {/* ------------------------- FOR SMALL SCREENS -------------------------  */}
                        {content}
                        {/* ------------------------- DESCRIPTION -------------------------  */}
                        <div className={style.description}>
                            <h3>Description</h3>
                            <p>
                                {respectLineBreaks(product.details.description)}
                            </p>
                        </div>
                    </div>
                    {/* ------------------------- FOR WIDE SCREENS -------------------------  */}
                    <div className={style.rightContent}>
                        {/* ------------------------- WRAPPER FOR STICKY POSITION -------------------------  */}
                        <div className={style.stickyWrapper}>
                            {/* ------------------------- HEADER -------------------------  */}
                            <div className={style.header}>
                                <div>
                                    <h2>{product.details.name}</h2>
                                    {product.best_seller && (
                                        <span className={style.bestSeller}>
                                            Best Seller
                                        </span>
                                    )}
                                </div>
                                <div className={style.rating}>
                                    <span>
                                        {getProductStars(
                                            product.reviews_counter,
                                            product.rating
                                        )}
                                    </span>
                                    <span>
                                        {product.rating || '5.0'}{' '}
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                </div>
                            </div>
                            {/* ------------------------- FOR WIDE SCREENS -------------------------  */}
                            {content}
                        </div>
                    </div>
                </div>
                <ProductRows
                    title='Related Products'
                    products={relatedProducts.filter(
                        product => product.details.id.toString() !== id
                    )}
                    url='/'
                />
            </div>
        </main>
    )
}
