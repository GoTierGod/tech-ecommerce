'use client'

import style from './purchase-review.module.css'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faMicrochip } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { ComposedProductInfo } from '@/types/product'
import { APIResponse } from '@/types/response'
import ErrorDisplay from '@/components/ErrorDisplay'
import Breadcrumbs from '@/components/Breadcrumbs'

interface PurchaseReviewProps {
    product: ComposedProductInfo
}

export default function PurchaseReview({ product }: PurchaseReviewProps) {
    const router = useRouter()
    const [waitingRes, setWaitingRes] = useState(false)
    const [err, setErr] = useState(
        null as null | { message: string; status: number; statusText: string }
    )

    const Formik = useFormik({
        initialValues: {
            rating: '',
            content: ''
        },
        onSubmit: async values => {
            setWaitingRes(true)

            const res = await fetch(`/api/review/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: product.details.id, ...values })
            })

            if (res.ok) {
                Formik.resetForm()
                router.replace(`/product/reviews/${product.details.id}`)
            } else {
                const errorResponse: APIResponse = await res.json()

                setErr({
                    message:
                        errorResponse?.message ||
                        errorResponse?.detail ||
                        'Something went wrong',
                    status: res.status,
                    statusText: res.statusText
                })
            }

            setWaitingRes(false)
        },
        validationSchema: Yup.object({
            rating: Yup.number()
                .required(`Rate the product`)
                .min(1, 'Rating must be at least 1')
                .max(5, 'Rating must be at most 5')
                .oneOf(
                    [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
                    'Rating must be from 1 to 5 increasing by 0.5'
                ),
            content: Yup.string()
                .required(`Provide comments about the purchased product`)
                .min(10)
                .max(45)
        })
    })

    const resetError = useCallback(() => setErr(null), [])

    return (
        <main
            style={
                err
                    ? {
                          background: 'var(--gray)',
                          padding: '2rem',
                          paddingTop: '99px',
                          minHeight: '100vh',
                          minWidth: '100%'
                      }
                    : {}
            }
        >
            {!err ? (
                <>
                    <Breadcrumbs
                        routeList={[
                            { path: '/history', name: 'History' },
                            { path: '/history/review', name: 'Review' }
                        ]}
                    />
                    <div className={style.wrapper}>
                        <section className={style.wrapperLeft}>
                            <div className={style.stickyWrapper}>
                                <header className={style.header}>
                                    <h2>{product.details.name}</h2>
                                    <FontAwesomeIcon icon={faMicrochip} />
                                </header>
                                <div className={style.content}>
                                    <div className={style.image}>
                                        <Image
                                            src={product.default_img.url}
                                            alt={
                                                product.default_img.description
                                            }
                                            width={250}
                                            height={250}
                                            quality='50'
                                            priority
                                        />
                                    </div>
                                    <Link
                                        href={`/product/${product.details.id}`}
                                        prefetch={false}
                                    >
                                        See Product
                                    </Link>
                                </div>
                            </div>
                        </section>
                        <section className={style.wrapperRight}>
                            <header className={style.header}>
                                <h2>Review</h2>
                                <FontAwesomeIcon icon={faFilePen} />
                            </header>
                            <form
                                className={style.review}
                                onSubmit={Formik.handleSubmit}
                            >
                                <div className={style.formField}>
                                    <label htmlFor='rating'>Rating</label>
                                    <select
                                        id='rating'
                                        {...Formik.getFieldProps('rating')}
                                    >
                                        <option value=''>- - -</option>
                                        <option value='5'>5.0</option>
                                        <option value='4.5'>4.5</option>
                                        <option value='4'>4.0</option>
                                        <option value='3.5'>3.5</option>
                                        <option value='3'>3.0</option>
                                        <option value='2.5'>2.5</option>
                                        <option value='2'>2.0</option>
                                        <option value='1.5'>1.5</option>
                                        <option value='1'>1.0</option>
                                    </select>
                                </div>
                                <div className={style.formField}>
                                    <label htmlFor='content'>Content</label>
                                    <textarea
                                        id='content'
                                        placeholder='Very good product...'
                                        minLength={10}
                                        maxLength={45}
                                        {...Formik.getFieldProps('content')}
                                    />
                                </div>
                                {!waitingRes ? (
                                    <div className={style.options}>
                                        <button onClick={() => router.back()}>
                                            Back
                                        </button>
                                        <button type='submit'>
                                            Submit Review
                                        </button>
                                    </div>
                                ) : (
                                    <div className={style.waitingMsg}>
                                        Publishing review...
                                    </div>
                                )}
                            </form>
                        </section>
                    </div>
                </>
            ) : (
                <ErrorDisplay
                    {...err}
                    action={resetError}
                    actionText='Try again'
                />
            )}
        </main>
    )
}
