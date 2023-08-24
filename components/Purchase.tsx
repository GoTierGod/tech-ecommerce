'use client'

import style from '../styles/purchase.module.css'

import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ComposedProductInfo } from '@/types/product'
import { useRouter } from 'next/navigation'
import { priceStringFormatter } from '@/utils/formatting/priceStringFormatter'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAsterisk,
    faCaretLeft,
    faCaretRight,
    faRightLong
} from '@fortawesome/free-solid-svg-icons'
import { Customer } from '@/types/users'

interface PurchaseProps {
    customer: Customer
    order: ComposedProductInfo[]
}

interface Coupon {
    id: number
    title: string
    amount: number
}

export default function Purchase({ customer, order }: PurchaseProps) {
    const router = useRouter()

    const [currIdx, setCurrIdx] = useState(0)
    const [currItem, setCurrItem] = useState(order[0])
    const [orderItems, setOrderItems] = useState(order.map(p => p.details.id))
    const [cartSpace, setCartSpace] = useState(10 - order.length)

    const paymentMethods = ['MasterCard', 'Visa']
    const coupons: Array<Coupon> = [{ id: 1, title: 'Global', amount: 25 }]

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

    const prevItem = useCallback(() => {
        if (currIdx > 0) setCurrIdx(prevCurrIdx => prevCurrIdx - 1)
    }, [currIdx, setCurrIdx])

    const nextItem = useCallback(() => {
        if (currIdx < order.length - 1)
            setCurrIdx(prevCurrIdx => prevCurrIdx + 1)
    }, [currIdx, setCurrIdx, order.length])

    const addOrderItem = useCallback(
        (e: ChangeEvent<HTMLSelectElement>, id: number) => {
            if (!/\d+/.test(e.target.value)) e.target.value = '1'
            if (Number(e.target.value) < 0) e.target.value = '1'
            if (
                Number(e.target.value) >
                cartSpace + orderItems.filter(itemId => itemId === id).length
            )
                e.target.value = '1'

            const insert = new Array(Number(e.target.value)).fill(id)

            setOrderItems(prevOrderItems =>
                prevOrderItems.filter(itemId => itemId !== id).concat(insert)
            )
        },
        [orderItems, setOrderItems, cartSpace]
    )

    const Formik = useFormik({
        initialValues: {
            products: orderItems,
            payment: '',
            country: customer.country,
            city: customer.city,
            address: customer.address,
            notes: '',
            coupon: ''
        },
        onSubmit: async values => {
            console.log(JSON.stringify(values))

            const res = await fetch('/api/purchase/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })

            if (res.ok) console.log('Successfull')
            else console.log('Failed')
        },
        validationSchema: Yup.object({
            products: Yup.array().min(1).max(10),
            payment: Yup.string()
                .required('A payment method is required')
                .is(
                    [...paymentMethods.map(pm => pm.toLowerCase())],
                    'Select your payment method'
                ),
            country: Yup.string()
                .required('Enter a new country')
                .max(255, 'Maximum 255 characters'),
            city: Yup.string()
                .required('Enter a new city')
                .max(255, 'Maximum 255 characters'),
            address: Yup.string()
                .required('Enter a new address')
                .max(255, 'Maximum 255 characters'),
            notes: Yup.string().max(255, 'Maximum 255 characters')
        })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setCurrItem(order[currIdx]), [currIdx])
    useEffect(() => setCartSpace(10 - orderItems.length), [orderItems])
    useEffect(() => {
        Formik.setFieldValue('products', orderItems)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderItems])

    useEffect(() => {
        if (Formik.errors) console.log(Formik.errors)
    }, [Formik.errors])

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
                <form
                    className={style.wrapperRight}
                    onSubmit={Formik.handleSubmit}
                >
                    <div className={style.delivery}>
                        <h2>Delivery</h2>
                        <div className={style.sectionWrapper}>
                            <div className={style.deliveryInfo}>
                                <p>
                                    This product will be delivered at the given
                                    address in aproximately 3 days, be sure to
                                    add the correct address to avoid further
                                    problems.
                                </p>
                                <p>
                                    <span>Important:</span> The address can only
                                    be changed before the “dispatch” phase, once
                                    the product is dispatched the address cannot
                                    be modified.
                                </p>
                            </div>
                            <div className={style.deliveryAddress}>
                                <div className={style.formField}>
                                    <label htmlFor='country'>
                                        <span>Country</span>
                                        <FontAwesomeIcon icon={faAsterisk} />
                                    </label>
                                    <input
                                        type='text'
                                        id='country'
                                        placeholder='United States'
                                        {...Formik.getFieldProps('country')}
                                    />
                                </div>
                                <div className={style.formField}>
                                    <label htmlFor='city'>
                                        <span>City</span>
                                        <FontAwesomeIcon icon={faAsterisk} />
                                    </label>
                                    <input
                                        type='text'
                                        id='city'
                                        placeholder='Willowbrook'
                                        {...Formik.getFieldProps('city')}
                                    />
                                </div>
                                <div className={style.formField}>
                                    <label htmlFor='address'>
                                        <span>Address</span>
                                        <FontAwesomeIcon icon={faAsterisk} />
                                    </label>
                                    <input
                                        type='text'
                                        id='address'
                                        placeholder='456 Oak Avenue'
                                        {...Formik.getFieldProps('address')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.payment}>
                        <h2>Payment</h2>
                        <div className={style.sectionWrapper}>
                            <div className={style.paymentMethod}>
                                <div className={style.formField}>
                                    <label htmlFor='payment'>
                                        <span>Payment Method</span>
                                        <FontAwesomeIcon icon={faAsterisk} />
                                    </label>
                                    <select
                                        id='payment'
                                        {...Formik.getFieldProps('payment')}
                                    >
                                        <option value=''>- - -</option>
                                        {paymentMethods.map(pm => (
                                            <option
                                                key={pm}
                                                value={pm.toLowerCase()}
                                            >
                                                {pm}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={style.paymentPrice}>
                                    <span>
                                        {priceStringFormatter(offerTotal)}
                                    </span>
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
                    </div>
                    <div className={style.couponList}>
                        <h2>Coupon</h2>
                        <div className={style.sectionWrapper}>
                            {order.length > 1 && (
                                <div className={style.cartCoupon}>
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
                                    <select id='coupon' name='coupon'>
                                        <option value=''>- - -</option>
                                        {coupons.map(c => (
                                            <option
                                                key={c.id}
                                                value={JSON.stringify(c)}
                                            >
                                                {`${
                                                    c.title
                                                } ( ${priceStringFormatter(
                                                    c.amount
                                                )} )`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={style.couponDiscount}>
                                    <span>
                                        {priceStringFormatter(
                                            coupons[0].amount
                                        )}
                                    </span>
                                    <span>Using this coupon</span>
                                    <span className={style.discount}>
                                        <span>
                                            {priceStringFormatter(offerTotal)}
                                        </span>
                                        <FontAwesomeIcon icon={faRightLong} />
                                        <span>
                                            {priceStringFormatter(
                                                offerTotal -
                                                    (Formik.values.coupon
                                                        ? (
                                                              JSON.parse(
                                                                  Formik.values
                                                                      .coupon
                                                              ) as Coupon
                                                          ).amount
                                                        : 0) -
                                                    (offerTotal *
                                                        order.length) /
                                                        100
                                            )}
                                        </span>
                                    </span>
                                </div>
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
                                    <select
                                        name={`units-${idx}`}
                                        id={`units-${idx}`}
                                        placeholder='1'
                                        defaultValue={1}
                                        onChange={e =>
                                            addOrderItem(e, p.details.id)
                                        }
                                    >
                                        {new Array(
                                            cartSpace +
                                                orderItems.filter(
                                                    itemId =>
                                                        itemId === p.details.id
                                                ).length
                                        )
                                            .fill(0)
                                            .map((opt, idx) => (
                                                <option
                                                    key={idx + 1}
                                                    value={idx + 1}
                                                >
                                                    {idx + 1}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.totalAndOptions}>
                        <h2>Confirm your purchase</h2>
                        <div className={style.sectionWrapper}>
                            <div className={style.total}>
                                <div>
                                    <h3>You will save</h3>
                                    <span>
                                        {priceStringFormatter(
                                            normalTotal - offerTotal
                                        )}
                                    </span>
                                </div>
                                <div>
                                    <span>You will pay</span>
                                    <span>
                                        {priceStringFormatter(offerTotal)}
                                    </span>
                                </div>
                            </div>
                            <div className={style.options}>
                                <button type='submit'>Confirm</button>
                                <button onClick={() => router.back()}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}
