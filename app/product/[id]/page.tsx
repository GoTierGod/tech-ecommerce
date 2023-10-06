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
import { getProductStars } from '@/utils/product/getProductStars'
import { getProductDeliveryDay } from '@/utils/product/getProductDeliveryDay'
import { getProductInstallments } from '@/utils/product/getProductInstallments'
import { notFound, redirect } from 'next/navigation'
import { getCustomer } from '@/utils/data/getCustomer'

import visaLogo from '@/public/images/payments/visa.svg'
import mastercardLogo from '@/public/images/payments/mastercard.svg'
import americanExpressLogo from '@/public/images/payments/american-express.svg'
import dinersClubLogo from '@/public/images/payments/diners-club-international.svg'
import { Metadata } from 'next'
import { priceFormatter } from '@/utils/formatting/priceFormatter'
import { getProduct } from '@/utils/data/getProduct'
import { getProducts } from '@/utils/data/getProducts'
import ProductFavsCart from '../_components/ProductFavsCart'
import { getCart } from '@/utils/data/getCart'
import { getFavorites } from '@/utils/data/getFavorites'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductDescription from '../_components/ProductDescription'
import { cookies } from 'next/dist/client/components/headers'

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

    const authCookies = cookies().get('authTokens')
    const customer = getCustomer()
    if (!customer && authCookies)
        redirect(`api/auth/refresh/?auth=0&path=/product/${id}`)

    const cart = await getCart()
    const favorites = await getFavorites()

    const productHeader = (
        <header className={style.header}>
            <h2>{product.details.name}</h2>
            <div className={style.reviews}>
                <span
                    className={style.rating}
                    title={`Rating: ${product.rating || 5.0}`}
                >
                    {getProductStars(product.reviews_counter, product.rating)}
                </span>
                {product.reviews_counter > 0 && (
                    <Link
                        className={style.link}
                        href={`/product/${id}/reviews`}
                        prefetch={false}
                    >
                        Reviews
                    </Link>
                )}
            </div>
        </header>
    )

    const productContent = (
        <div className={style.content}>
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
            <div className={style.options}>
                <span>Stock: {product.details.stock}</span>
                <Link
                    className={style.link}
                    href={`/product/${product.details.id}/purchase`}
                    prefetch={false}
                >
                    <span>Buy Now</span>
                </Link>
                {customer ? (
                    <ProductFavsCart
                        product={product}
                        cart={cart}
                        favorites={favorites}
                    />
                ) : (
                    <Link className={style.link} href='/login' prefetch={false}>
                        <span>Log in</span>
                    </Link>
                )}
            </div>
            <article className={style.delivery}>
                <h3>Delivery</h3>
                <span>
                    <FontAwesomeIcon icon={faTruck} /> It arrives for free this{' '}
                    {getProductDeliveryDay()}
                </span>
            </article>
            <article className={style.brand}>
                <h3>
                    Offered by <span>{product.details.brand.name}</span>
                </h3>
                <p>{product.details.brand.description}</p>
            </article>
            <div className={style.warrantyAndPoints}>
                <article>
                    <h3>Warranty</h3>
                    <span>
                        <FontAwesomeIcon icon={faShieldAlt} />{' '}
                        {product.details.months_warranty} Months
                    </span>
                    <Link
                        className={style.link}
                        href='/warranty'
                        prefetch={false}
                    >
                        <span>About Warranty</span>
                    </Link>
                </article>
                <article>
                    <h3>T-Points</h3>
                    <span>
                        <FontAwesomeIcon icon={faStar} />{' '}
                        {Number(product.details.price)} Points
                    </span>
                    <Link
                        className={style.link}
                        href='/points'
                        prefetch={false}
                    >
                        <span>About Points</span>
                    </Link>
                </article>
            </div>
            <article className={style.payment}>
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
            </article>
        </div>
    )

    return (
        <main>
            <Breadcrumbs
                routeList={[
                    { path: `/product/${product.details.id}`, name: 'Product' }
                ]}
            />
            <div className={style.wrapper}>
                <section className={style.product}>
                    <div className={style.wrapperLeft}>
                        {productHeader}
                        <ProductImages images={product.images} />
                        <article className={style.brandProducts}>
                            <header>
                                <h3>More of {product.details.brand.name}</h3>
                                <Link
                                    className={style.link}
                                    href={`/search/${product.details.brand.name}?page=1`}
                                    prefetch={false}
                                >
                                    {product.details.brand.name}
                                    <FontAwesomeIcon icon={faRightLong} />
                                </Link>
                            </header>
                            <div>
                                {brandProducts.map(product => (
                                    <VerticalCard
                                        key={product.details.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        </article>
                        <article className={style.category}>
                            <h3>See more in this category</h3>
                            <Link
                                className={style.link}
                                href={`/search/${product.details.category.title}?page=1`}
                                prefetch={false}
                            >
                                {product.details.category.title}
                                <FontAwesomeIcon icon={faRightLong} />
                            </Link>
                        </article>
                        {productContent}
                        <ProductDescription
                            description={product.details.description}
                        />
                    </div>
                    <div className={style.wrapperRight}>
                        <div className={style.stickyWrapper}>
                            {productHeader}
                            {productContent}
                        </div>
                    </div>
                </section>
                <ProductsSection
                    title='Related Products'
                    products={relatedProducts.filter(
                        product => product.details.id.toString() !== id
                    )}
                    url={`/search/${product.details.category}?page=1`}
                />
            </div>
        </main>
    )
}
