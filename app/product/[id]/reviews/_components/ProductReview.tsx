'use client'

import style from './product-review.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faExclamation,
    faStar,
    faThumbsDown,
    faThumbsUp
} from '@fortawesome/free-solid-svg-icons'

import { useCallback, useMemo, useState } from 'react'
import { ComposedReviewData } from '@/types/review'
import { useRouter } from 'next/navigation'
import { CustomerData } from '@/types/customer'
import { CustomerInteractions } from '@/types/customer'

interface ProductReviewProps {
    review: ComposedReviewData
    customer: CustomerData
    interactions: CustomerInteractions
}

export default function ProductReview({
    review,
    customer,
    interactions
}: ProductReviewProps) {
    const router = useRouter()
    const [waitingRes, setWaitingRes] = useState(false)

    const likeAction = useCallback(async () => {
        if (!waitingRes) {
            setWaitingRes(true)

            const res = await fetch(`/api/review/like?id=${review.review.id}`, {
                method: 'PATCH'
            })

            if (res.ok) router.refresh()

            setWaitingRes(false)
        }
    }, [router, review.review.id, waitingRes])

    const dislikeAction = useCallback(async () => {
        if (!waitingRes) {
            setWaitingRes(true)

            const res = await fetch(
                `/api/review/dislike?id=${review.review.id}`,
                {
                    method: 'PATCH'
                }
            )

            if (res.ok) router.refresh()

            setWaitingRes(false)
        }
    }, [router, review.review.id, waitingRes])

    const reportAction = useCallback(async () => {
        if (!waitingRes) {
            setWaitingRes(true)

            const res = await fetch(
                `/api/review/report?id=${review.review.id}`,
                {
                    method: 'PATCH'
                }
            )

            if (res.ok) router.refresh()

            setWaitingRes(false)
        }
    }, [router, review.review.id, waitingRes])

    const isLiked = useMemo(() => {
        return interactions.likes.includes(review.review.id)
    }, [interactions.likes, review.review.id])

    const isDisliked = useMemo(() => {
        return interactions.dislikes.includes(review.review.id)
    }, [interactions.dislikes, review.review.id])

    const isReported = useMemo(() => {
        return interactions.reports.includes(review.review.id)
    }, [interactions.reports, review.review.id])

    return (
        <div className={style.card}>
            <div className={style.header}>
                <div>
                    <h3>@{review.review.customer}</h3>
                </div>
                <div>
                    <h3>{review.review.rating}</h3>
                    <FontAwesomeIcon icon={faStar} />
                </div>
            </div>
            <div className={style.content}>
                <p>{review.review.content}</p>
            </div>
            {customer && !isReported ? (
                <div className={style.footer}>
                    <div>
                        <button
                            className={style.likes}
                            onClick={likeAction}
                            aria-label='Like'
                            disabled={waitingRes}
                            style={
                                isLiked
                                    ? {
                                          background: 'var(--main)'
                                      }
                                    : {}
                            }
                        >
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <span>{review.likes}</span>
                        </button>
                        <button
                            className={style.dislikes}
                            onClick={dislikeAction}
                            aria-label='Dislike'
                            disabled={waitingRes}
                            style={
                                isDisliked
                                    ? {
                                          background: 'var(--main)'
                                      }
                                    : {}
                            }
                        >
                            <FontAwesomeIcon icon={faThumbsDown} />
                            <span>{review.dislikes}</span>
                        </button>
                    </div>
                    <button onClick={reportAction} disabled={waitingRes}>
                        <span>Report</span>
                        <FontAwesomeIcon icon={faExclamation} />
                    </button>
                </div>
            ) : (
                <span className={style.reported}>
                    <FontAwesomeIcon icon={faExclamation} />
                    Your report was sent
                </span>
            )}
        </div>
    )
}
