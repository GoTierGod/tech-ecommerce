import style from './page.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faExclamation,
    faFileEdit,
    faPencil,
    faThumbsDown,
    faThumbsUp
} from '@fortawesome/free-solid-svg-icons'

import ProductReview from './_components/ProductReview'
import { getReviews } from '@/utils/data/getReviews'
import { getCustomer } from '@/utils/data/getCustomer'
import { getInteractions } from '@/utils/data/getInteractions'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const customer = getCustomer()
    const interactions = await getInteractions()

    const reviews = await getReviews(id)

    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.wrapperLeft}>
                    <div className={style.header}>
                        <h2>Review options</h2>
                        <FontAwesomeIcon icon={faPencil} />
                    </div>
                    <div className={style.content}>
                        <span>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <span>Remove the product from your reviews</span>
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faThumbsDown} />
                            <span>Move the product to your cart</span>
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faExclamation} />
                            <span>Report an inappropriate review</span>
                        </span>
                    </div>
                </div>
                <div className={style.wrapperRight}>
                    <div className={style.header}>
                        <h2>Reviews</h2>
                        <FontAwesomeIcon icon={faFileEdit} />
                    </div>
                    {reviews.length > 0 ? (
                        <div className={style.grid}>
                            {reviews.map(review => (
                                <ProductReview
                                    key={review.review.id}
                                    review={review}
                                    customer={customer}
                                    interactions={interactions}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={style.empty}>
                            <h3>No reviews!</h3>
                            <p>
                                At this moment this product has no reviews, you
                                can write a review after buying a product, check
                                out our offers
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
