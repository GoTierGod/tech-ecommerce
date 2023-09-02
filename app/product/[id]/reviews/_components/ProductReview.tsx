'use client'

import style from './product-review.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faExclamation,
    faStar,
    faThumbsDown,
    faThumbsUp
} from '@fortawesome/free-solid-svg-icons'

import { useCallback } from 'react'
import { ComposedReviewInfo } from '@/types/review'
import { useRouter } from 'next/navigation'
import { CustomerData } from '@/types/users'

interface ProductReviewProps {
    review: ComposedReviewInfo
    customer: CustomerData
}

export default function ProductReview({
    review,
    customer
}: ProductReviewProps) {
    const router = useRouter()

    const likeAction = useCallback(async () => {
        const res = await fetch(`/api/review/like?id=${review.review.id}`, {
            method: 'PATCH'
        })

        if (res.ok) router.refresh()
    }, [router, review.review.id])

    const dislikeAction = useCallback(async () => {
        const res = await fetch(`/api/review/dislike?id=${review.review.id}`, {
            method: 'PATCH'
        })

        if (res.ok) router.refresh()
    }, [router, review.review.id])

    const reportAction = useCallback(async () => {
        const res = await fetch(`/api/review/report?id=${review.review.id}`, {
            method: 'PATCH'
        })

        if (res.ok) router.refresh()
    }, [router, review.review.id])

    return (
        <div className={style.card}>
            <div className={style.header}>
                <div>
                    <h3>@{review.review.customer.user.username}</h3>
                </div>
                <div>
                    <h3>{review.review.rating}</h3>
                    <FontAwesomeIcon icon={faStar} />
                </div>
            </div>
            <div className={style.content}>
                <p>{review.review.content}</p>
            </div>
            {customer && (
                <div className={style.footer}>
                    <div>
                        <button
                            className={style.likes}
                            onClick={likeAction}
                            aria-label='Like'
                        >
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <span>{review.likes}</span>
                        </button>
                        <button
                            className={style.dislikes}
                            onClick={dislikeAction}
                            aria-label='Dislike'
                        >
                            <FontAwesomeIcon icon={faThumbsDown} />
                            <span>{review.dislikes}</span>
                        </button>
                    </div>
                    <button onClick={reportAction}>
                        <span>Report</span>
                        <FontAwesomeIcon icon={faExclamation} />
                    </button>
                </div>
            )}
        </div>
    )
}
