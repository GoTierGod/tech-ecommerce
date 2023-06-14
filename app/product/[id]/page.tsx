import style from './page.module.css'

import { notFound } from 'next/navigation'

import { getData } from '@/helpers/getData'
import { CardProductDetails, FullProductDetails } from '@/types/products'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBox,
    faShieldAlt,
    faStar,
    faStarHalf,
    faTruck
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import VerticalCard from '@/components/VerticalCard'
import ProductRows from '@/components/ProductRows'

const getStars = (reviews_ct: number, rating: number) => {
    const stars: Array<JSX.Element> = []

    if (!reviews_ct) {
        for (let i = 0; i < 5; i++) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} />)
        }

        return stars
    }

    const productRating = rating

    const wholeStars = productRating - (productRating % 1)

    for (let i = 0; i < wholeStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} />)
    }

    if (productRating - wholeStars >= 0.6) {
        stars.push(<FontAwesomeIcon key={wholeStars + 1} icon={faStar} />)
    } else if (productRating - wholeStars >= 0.1) {
        stars.push(<FontAwesomeIcon key={wholeStars + 1} icon={faStarHalf} />)
    }

    return stars
}

const getInstallments = (installments: number, offer: string) =>
    `${installments}x $${(
        Number(offer) / installments +
        Number(offer) / 100
    ).toFixed(2)}`

const getDeliveryCost = (price: string) =>
    Number(price) >= 50 ? 'for free' : `for $${(Number(price) / 10).toFixed(2)}`
const deliveryDay: string = new Date(
    new Date().setDate(new Date().getDate() + 3)
).toLocaleString('en-US', { weekday: 'long' })

const product = async ({ params }: { params: { id: string } }) => {
    const { id } = params

    const product: FullProductDetails = await getData(
        `https://ft-drf-api.vercel.app/api/products/${id}`
    )
    const brandProducts: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?brand=${product.details.brand.name}&limit=4`
    )
    const relatedProducts: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products?brand=${product.details.brand.name}&limit=6`
    )

    const defaultImg = product.images.find(image => image.is_default)

    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.product}>
                    {/* ------------------------- HEADER -------------------------  */}
                    <div className={style.header}>
                        <div>
                            <h2>{product.details.name}</h2>
                            {Number(product.details.price) > 50 && (
                                <span>Free Shipping</span>
                            )}
                        </div>
                        <div>
                            <span>
                                {getStars(
                                    product.reviews_counter,
                                    product.rating
                                )}
                            </span>
                            <span>
                                (
                                <Link href='/'>
                                    {product.reviews_counter} Reviews
                                </Link>
                                )
                            </span>
                        </div>
                    </div>
                    {/* ------------------------- IMAGES -------------------------  */}
                    <div className={style.images}>
                        <Image
                            src={defaultImg?.url || ''}
                            alt={defaultImg?.description || ''}
                            width={450}
                            height={450}
                            quality='100'
                        />
                        <div>
                            {product.images.map(image => (
                                <Image
                                    key={image.id}
                                    src={image.url}
                                    alt={image.description}
                                    height={48}
                                    width={48}
                                    quality='100'
                                />
                            ))}
                        </div>
                    </div>
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
                        <Link href='/'>{product.details.category.title}</Link>
                    </div>
                    {/* ------------------------- OFFER -------------------------  */}
                    <div className={style.offer}>
                        <div>
                            <span>$ {product.details.price}</span>
                            <span>Best Seller</span>
                        </div>
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
                    {/* ------------------------- OPTIONS -------------------------  */}
                    <div className={style.options}>
                        <span>stock: {product.details.stock}</span>
                        <Link href='/'>Buy Now</Link>
                        <Link href='/'>Add to Cart</Link>
                    </div>
                    {/* ------------------------- DELIVERY -------------------------  */}
                    <div className={style.delivery}>
                        <h3>Delivery</h3>
                        <span>
                            <FontAwesomeIcon icon={faTruck} /> It arrives for{' '}
                            {getDeliveryCost(product.details.price)} this{' '}
                            {deliveryDay}
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faBox} />
                            Pick up your package for{' '}
                            {getDeliveryCost(product.details.price)} starting
                            from {deliveryDay}
                        </span>
                    </div>
                    {/* ------------------------- WARRANTY AND POINTS -------------------------  */}
                    <div className={style.wp}>
                        <div>
                            <h3>Warranty</h3>
                            <span>
                                <FontAwesomeIcon icon={faShieldAlt} />{' '}
                                {product.details.months_warranty} Months
                            </span>
                            <Link href='/'>Read More</Link>
                        </div>
                        <div>
                            <h3>FT Points</h3>
                            <span>
                                <FontAwesomeIcon icon={faStar} />{' '}
                                {Number(product.details.price)} Points
                            </span>
                            <Link href='/'>Log In</Link>
                        </div>
                    </div>
                    {/* ------------------------- PAYMENT -------------------------  */}
                    <div className={style.payment}>
                        <h3>Payment Methods</h3>
                        <div>
                            <div>
                                <h4>Credit Cards</h4>
                                <span>
                                    {getInstallments(
                                        product.details.installments,
                                        product.details.offer_price
                                    )}
                                </span>
                            </div>
                            <div>
                                <h4>Others</h4>
                                <span>$ {product.details.offer_price}</span>
                            </div>
                        </div>
                    </div>
                    {/* ------------------------- DESCRIPTION -------------------------  */}
                    <div className={style.description}>
                        <h3>Description</h3>
                        <p>{product.details.description}</p>
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

export const generateStaticParams = async () => {
    const products: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/products`
    )

    return products.map(product => ({ id: String(product.details.id) }))
}

export const dynamicParams = false
export const revalidate = 60

export default product
