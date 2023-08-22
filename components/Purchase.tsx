'use client'

import { useMemo, useState } from 'react'
import style from '../styles/purchase.module.css'

import { ComposedProductInfo } from '@/types/product'
import { useRouter } from 'next/navigation'
import { priceStringFormatter } from '@/utils/formatting/priceStringFormatter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

interface PurchaseProps {
    order: ComposedProductInfo[]
}

export default function Purchase({ order }: PurchaseProps) {
    const router = useRouter()

    const [seeProduct, setSeeProduct] = useState(order[0])
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

    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.wrapperLeft}></div>
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
                        <div className={style.formField}>
                            <label htmlFor='address'>Address</label>
                            <input type='text' id='address' />
                        </div>
                    </div>
                    <div className={style.payment}>
                        <h2>Payment</h2>
                        <div className={style.formField}>
                            <label htmlFor='payment'>Payment Method</label>
                            <select name='payment' id='payment'>
                                <option value=''>- - -</option>
                            </select>
                        </div>
                        <div className={style.paymentPrice}>
                            <span>{priceStringFormatter(offerTotal)}</span>
                            <span>Using this payment method</span>
                        </div>
                    </div>
                    <div className={style.coupon}>
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
                        <div className={style.formField}>
                            <label htmlFor='coupon'>Coupon</label>
                            <select name='coupon' id='coupon'>
                                <option value='global'>Global</option>
                            </select>
                        </div>
                        <div className={style.couponDiscount}>
                            <span>$ 35.00</span>
                            <span>Using this coupon</span>
                        </div>
                    </div>
                    <div className={style.unitsAndPrice}>
                        <h2>Units and Price</h2>
                        {order.map((p, idx) => (
                            <div key={p.details.id} className={style.formField}>
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
