import style from './page.module.css'

import { ComposedProductInfo } from '@/types/product'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faRightLong,
    faShieldAlt,
    faStar,
    faTruck
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'

import VerticalCard from '@/components/VerticalCard'
import ProductsSection from '@/components/ProductsSection'
import ProductImages from '@/app/product/_components/ProductImages'
import { getProductStars } from '@/utils/products/getProductStars'
import { getProductDeliveryDay } from '@/utils/products/getProductDeliveryDay'
import { getProductInstallments } from '@/utils/products/getProductInstallments'
import { notFound } from 'next/navigation'
import { respectLineBreaks } from '@/utils/formatting/respectLineBreaks'
import { getUser } from '@/utils/data/getUser'

import visaLogo from '../../../public/images/payments/visa.svg'
import mastercardLogo from '../../../public/images/payments/mastercard.svg'
import americanExpressLogo from '../../../public/images/payments/american-express.svg'
import dinersClubLogo from '../../../public/images/payments/diners-club-international.svg'
import { Metadata } from 'next'
import { priceStringFormatter } from '@/utils/formatting/priceStringFormatter'
import { getProduct } from '@/utils/data/getProduct'
import { getProducts } from '@/utils/data/getProducts'
import ProductFavsCart from '../_components/ProductFavsCart'
import { getCart } from '@/utils/data/getCart'
import { getFavorites } from '@/utils/data/getFavorites'

const paymentLogos = [
    { src: visaLogo, alt: 'Visa' },
    { src: mastercardLogo, alt: 'Mastercard' },
    { src: americanExpressLogo, alt: 'American Express' },
    { src: dinersClubLogo, alt: 'Diners Club International' }
]

export const metadata: Metadata = {
    title: 'Product | Tech'
}

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const product: ComposedProductInfo | null = await getProduct(id)

    if (!product) return notFound()
    metadata.title = `${product.details.name} | Tech`

    const brandProducts: ComposedProductInfo[] = await getProducts(
        `?brand=${product.details.brand.name}&limit=4`
    )
    const relatedProducts: ComposedProductInfo[] = await getProducts(
        `?category=${product.details.category.title}&limit=6`
    )

    const user = await getUser()

    const cart = await getCart()
    const favorites = await getFavorites()

    const productHeader = (
        <div className={style.header}>
            <h2>{product.details.name}</h2>
            <div
                className={style.rating}
                aria-label={`Rating: ${product.rating || 5.0}`}
            >
                {getProductStars(product.reviews_counter, product.rating)}
            </div>
        </div>
    )

    const productContent = (
        <div className={style.content}>
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
            <div className={style.options}>
                <span>Stock: {product.details.stock}</span>
                <Link href={`/product/${product.details.id}/purchase`}>
                    <span>Buy Now</span>
                </Link>
                {user ? (
                    <ProductFavsCart
                        product={product}
                        cart={cart}
                        favorites={favorites}
                    />
                ) : (
                    <Link href='/login' prefetch={false}>
                        <span>Log in</span>
                    </Link>
                )}
            </div>
            <div className={style.delivery}>
                <h3>Delivery</h3>
                <span>
                    <FontAwesomeIcon icon={faTruck} /> It arrives for free this{' '}
                    {getProductDeliveryDay()}
                </span>
            </div>
            <div className={style.brand}>
                <h3>
                    Offered by <span>{product.details.brand.name}</span>
                </h3>
                <p>{product.details.brand.description}</p>
            </div>
            <div className={style.warrantyAndPoints}>
                <div>
                    <h3>Warranty</h3>
                    <span>
                        <FontAwesomeIcon icon={faShieldAlt} />{' '}
                        {product.details.months_warranty} Months
                    </span>
                    <Link href='/warranty' prefetch={false}>
                        <span>About Warranty</span>
                    </Link>
                </div>
                <div>
                    <h3>T-Points</h3>
                    <span>
                        <FontAwesomeIcon icon={faStar} />{' '}
                        {Number(product.details.price)} Points
                    </span>
                    <Link href='/points' prefetch={false}>
                        <span>About Points</span>
                    </Link>
                </div>
            </div>
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
                    <div className={style.wrapperLeft}>
                        {productHeader}
                        <ProductImages images={product.images} />
                        <div className={style.brandProducts}>
                            <div>
                                <h3>More of {product.details.brand.name}</h3>
                                <Link
                                    href={`/search/${product.details.brand.name}?page=1`}
                                    prefetch={false}
                                >
                                    {product.details.brand.name}
                                    <FontAwesomeIcon icon={faRightLong} />
                                </Link>
                            </div>
                            <div>
                                {brandProducts.map(product => (
                                    <VerticalCard
                                        key={product.details.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={style.category}>
                            <h3>See more in this category</h3>
                            <Link
                                href={`/search/${product.details.category.title}?page=1`}
                                prefetch={false}
                            >
                                {product.details.category.title}
                                <FontAwesomeIcon icon={faRightLong} />
                            </Link>
                        </div>
                        {productContent}
                        <div className={style.description}>
                            <h3>Description</h3>
                            <p>
                                {respectLineBreaks(product.details.description)}
                            </p>
                        </div>
                    </div>
                    <div className={style.wrapperRight}>
                        <div className={style.stickyWrapper}>
                            {productHeader}
                            {productContent}
                        </div>
                    </div>
                </div>
                <ProductsSection
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
