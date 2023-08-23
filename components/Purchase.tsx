'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import style from '../styles/purchase.module.css'

import { ComposedProductInfo } from '@/types/product'
import { useRouter } from 'next/navigation'
import { priceStringFormatter } from '@/utils/formatting/priceStringFormatter'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCaretLeft,
    faCaretRight,
    faRightLong
} from '@fortawesome/free-solid-svg-icons'
import { Customer } from '@/types/users'

interface PurchaseProps {
    customer: Customer
    order: ComposedProductInfo[]
}

export default function Purchase({ customer, order }: PurchaseProps) {
    const router = useRouter()

    const [currIdx, setCurrIdx] = useState(0)
    const [currItem, setCurrItem] = useState(order[0])
    const [orderItems, setOrderItems] = useState(order.map(p => p.details.id))

    const normalTotal =
        order.length > 0
            ? order
                  .map(p => Number(p.details.price))
                  .reduce((p1, p2) => p1 + p2)
            : 0
    const offerTotal =
        order.length > 0
            ? order
                  .map(p => Number(p.details.offer_price))
                  .reduce((p1, p2) => p1 + p2)
            : 0
    const orderOfferTotal =
        order.length > 0 ? offerTotal - (offerTotal * order.length) / 100 : 0

    const prevItem = useCallback(() => {
        if (currIdx > 0) setCurrIdx(prevCurrIdx => prevCurrIdx - 1)
    }, [currIdx, setCurrIdx])

    const nextItem = useCallback(() => {
        if (currIdx < order.length - 1)
            setCurrIdx(prevCurrIdx => prevCurrIdx + 1)
    }, [currIdx, setCurrIdx, order.length])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setCurrItem(order[currIdx]), [currIdx])

    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.wrapperLeft}>
                    <div className={style.stickyWrapper}>
                        <div className={style.currItemTop}>
                            <h2>{currItem.details.name}</h2>
                            <div className={style.currItemImg}>
                                <button
                                    onClick={prevItem}
                                    aria-label='Previous'
                                >
                                    <FontAwesomeIcon icon={faCaretLeft} />
                                </button>
                                <Image
                                    src={currItem.default_img.url}
                                    alt={currItem.default_img.description}
                                    width={250}
                                    height={250}
                                    quality='50'
                                />
                                <button onClick={nextItem} aria-label='Next'>
                                    <FontAwesomeIcon icon={faCaretRight} />
                                </button>
                            </div>
                        </div>
                        <div className={style.currItemBottom}>
                            <div className={style.currItemPrice}>
                                <span>Price</span>
                                <div>
                                    <span>
                                        {priceStringFormatter(
                                            currItem.details.price
                                        )}
                                    </span>
                                    <span>
                                        {priceStringFormatter(
                                            currItem.details.offer_price
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className={style.currItemSpecs}>
                                <div>
                                    <span>Key</span>
                                    <span>Value</span>
                                </div>
                                <div>
                                    <span>Key</span>
                                    <span>Value</span>
                                </div>
                                <div>
                                    <span>Key</span>
                                    <span>Value</span>
                                </div>
                                <div>
                                    <span>Key</span>
                                    <span>Value</span>
                                </div>
                                <Link
                                    href={`/product/${currItem.details.id}`}
                                    prefetch={false}
                                >
                                    See Product
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.wrapperRight}>
                    <div className={style.delivery}>
                        <h2>Delivery</h2>
                        <div>
                            <p>
                                This product will be delivered at the given
                                address in aproximately 3 days, be sure to add
                                the correct address to avoid further problems.
                            </p>
                            <p>
                                <span>Important:</span> The address can only be
                                changed before the “dispatch” phase, once the
                                product is dispatched the address cannot be
                                modified.
                            </p>
                        </div>
                        <div className={style.location}>
                            <div className={style.formField}>
                                <label htmlFor='country'>Country</label>
                                <input type='text' id='country' />
                            </div>
                            <div className={style.formField}>
                                <label htmlFor='city'>City</label>
                                <input type='text' id='city' />
                            </div>
                            <div className={style.formField}>
                                <label htmlFor='address'>Address</label>
                                <input type='text' id='address' />
                            </div>
                        </div>
                    </div>
                    <div className={style.payment}>
                        <h2>Payment</h2>
                        <div className={style.paymentMethod}>
                            <div className={style.formField}>
                                <label htmlFor='payment'>Payment Method</label>
                                <select name='payment' id='payment'>
                                    <option value=''>- - -</option>
                                </select>
                            </div>
                            <div className={style.paymentPrice}>
                                <span>{priceStringFormatter(offerTotal)}</span>
                                <span>Using this payment method</span>
                                <span className={style.discount}>
                                    <span>
                                        {priceStringFormatter(normalTotal)}
                                    </span>
                                    <FontAwesomeIcon icon={faRightLong} />
                                    <span>
                                        {priceStringFormatter(offerTotal)}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.couponList}>
                        <h2>Coupon</h2>
                        {order.length > 1 && (
                            <div>
                                <span>
                                    {order.length}% ({' '}
                                    {priceStringFormatter(
                                        (offerTotal * order.length) / 100
                                    )}{' '}
                                    )
                                </span>
                                <span>Cart Coupon</span>
                            </div>
                        )}
                        <div className={style.coupon}>
                            <div className={style.formField}>
                                <label htmlFor='coupon'>Coupon</label>
                                <select name='coupon' id='coupon'>
                                    <option value='global'>Global</option>
                                </select>
                            </div>
                            <div className={style.couponDiscount}>
                                <span>$ 35.00</span>
                                <span>Using this coupon</span>
                                <span className={style.discount}>
                                    <span>
                                        {priceStringFormatter(offerTotal)}
                                    </span>
                                    <FontAwesomeIcon icon={faRightLong} />
                                    <span>
                                        {priceStringFormatter(
                                            offerTotal -
                                                35 -
                                                (offerTotal * order.length) /
                                                    100
                                        )}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.unitsAndPrice}>
                        <h2>Units and Price</h2>
                        <div className={style.units}>
                            {order.map((p, idx) => (
                                <div
                                    key={p.details.id}
                                    className={style.formField}
                                >
                                    <label htmlFor={`units-${idx}`}>
                                        {p.details.name}
                                    </label>
                                    <input
                                        type='number'
                                        name={`units-${idx}`}
                                        id={`units-${idx}`}
                                        min={1}
                                        max={10 - orderItems.length}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className={style.total}>
                            <h3>Total</h3>
                            <div>
                                <span>{priceStringFormatter(normalTotal)}</span>
                                <span>{priceStringFormatter(offerTotal)}</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.options}>
                        <button type='submit'>Confirm</button>
                        <button onClick={() => router.back()}>Cancel</button>
                    </div>
                </div>
            </div>
        </main>
    )
}
