import style from './page.module.css'

import { getData } from '@/helpers/getData'
import { CardProductDetails, FullProductDetails } from '@/types/products'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBox,
    faShieldAlt,
    faStar,
    faTruck
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import VerticalCard from '@/components/VerticalCard'
import ProductRows from '@/components/ProductRows'
import { getStars } from '@/helpers/getStars'
import { getDeliveryDay } from '@/helpers/getDeliveryDay'
import { getInstallments } from '@/helpers/getInstallments'
import { notFound } from 'next/navigation'
import { metadata } from '@/app/layout'

export default async function Product({ params }: { params: { id: string } }) {
    const { id } = params

    const product: FullProductDetails | false = await getData(
        `https://ft-drf-api.vercel.app/api/products/${id}`
    )

    if (!product) return notFound()
    metadata.title = `${product.details.name} | Tech`

    const brandProducts: CardProductDetails[] | false = await getData(
        `https://ft-drf-api.vercel.app/api/products?brand=${product.details.brand.name}&limit=5`
    )
    const relatedProducts: CardProductDetails[] | false = await getData(
        `https://ft-drf-api.vercel.app/api/products?brand=${product.details.brand.name}&limit=6`
    )

    if (!brandProducts || !relatedProducts) return notFound()

    const defaultImg = product.images.find(image => image.is_default)

    const content = (
        <div className={style.content}>
            {/* ------------------------- OFFER -------------------------  */}
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
                    <FontAwesomeIcon icon={faTruck} /> It arrives for free this{' '}
                    {getDeliveryDay()}
                </span>
                <span>
                    <FontAwesomeIcon icon={faBox} />
                    Pick up your package for free starting from{' '}
                    {getDeliveryDay()}
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
                                <span className={style.bestSeller}>
                                    Best Seller
                                </span>
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
                            <Link href='/'>
                                {product.details.category.title}
                            </Link>
                        </div>
                        {/* ------------------------- FOR SMALL SCREENS -------------------------  */}
                        {content}
                        {/* ------------------------- DESCRIPTION -------------------------  */}
                        <div className={style.description}>
                            <h3>Description</h3>
                            <p>{product.details.description}</p>
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
                                    <span className={style.bestSeller}>
                                        Best Seller
                                    </span>
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
