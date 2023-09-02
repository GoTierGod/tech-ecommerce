import style from './page.module.css'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl, faMicrochip } from '@fortawesome/free-solid-svg-icons'

import { Order } from '@/types/tables'
import { priceStringFormatter } from '@/utils/formatting/priceStringFormatter'
import { titleCaseFormatter } from '@/utils/formatting/titleCaseFormatter'
import { getPurchase } from '@/utils/data/getPurchase'
import { getUser } from '@/utils/data/getUser'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const user = await getUser()
    if (!user) redirect(`/api/auth/refresh?path=/history/details/${id}&auth=1`)

    const purchase = await getPurchase(id)
    if (!purchase) redirect('')

    const orderState = (order: Order): ReactNode => {
        if (order.delivered)
            return (
                <p className={style.orderState}>
                    <span>Delivered:</span> The product was delivered at the
                    given address.
                </p>
            )
        if (order.on_the_way)
            return (
                <>
                    <p className={style.orderState}>
                        <span>On the way:</span> We are sending the package to
                        the given address.
                    </p>
                    <p className={style.orderState}>
                        <span>Next phase:</span> Delivered.
                    </p>
                </>
            )
        if (order.dispatched)
            return (
                <>
                    <p className={style.orderState}>
                        <span>Dispatched:</span> The order was dispatched and
                        cannot be canceled. But you can still change the
                        delivery address.
                    </p>
                    <p className={style.orderState}>
                        <span>Next phase:</span> On the way.
                    </p>
                </>
            )
        return (
            <>
                <p className={style.orderState}>
                    <span>Preparing:</span> We are preparing your order to be
                    dispatched soon.
                </p>
                <p className={style.orderState}>
                    <span>Next phase:</span> Dispatched.
                </p>
            </>
        )
    }

    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.wrapperLeft}>
                    <div className={style.stickyWrapper}>
                        <div className={style.header}>
                            <h2>{purchase.product.details.name}</h2>
                            <FontAwesomeIcon icon={faMicrochip} />
                        </div>
                        <div className={style.content}>
                            <div className={style.image}>
                                <Image
                                    src={purchase.product.default_img.url}
                                    alt={
                                        purchase.product.default_img.description
                                    }
                                    width={250}
                                    height={250}
                                    quality='50'
                                />
                            </div>
                            <div className={style.options}>
                                <Link href={`/purchase/history`}>
                                    Back to History
                                </Link>
                                <Link
                                    href={`/product/${purchase.product.details.id}`}
                                >
                                    See Product
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.wrapperRight}>
                    <div className={style.header}>
                        <h2>Details</h2>
                        <FontAwesomeIcon icon={faListUl} />
                    </div>
                    <div className={style.grid}>
                        <div className={style.detail}>
                            <h3>Address</h3>
                            <p>{`${purchase.order.country} / ${purchase.order.city} / ${purchase.order.address}`}</p>
                        </div>
                        <div className={style.detail}>
                            <h3>Payment Method</h3>
                            <p>
                                {titleCaseFormatter(
                                    purchase.order.payment_method
                                )}
                            </p>
                        </div>
                        <div className={style.detail}>
                            <h3>Paid</h3>
                            <p>
                                <span>{purchase.order_item.quantity}</span>{' '}
                                {purchase.order_item.quantity > 1
                                    ? 'products'
                                    : 'product'}{' '}
                                for{' '}
                                <span>
                                    {priceStringFormatter(
                                        purchase.order_item.total_cost
                                    )}
                                </span>
                            </p>
                        </div>
                        <div className={style.detail}>
                            <h3>Order State</h3>
                            {orderState(purchase.order)}
                        </div>
                        <div className={style.detail}>
                            <h3>Notes:</h3>
                            <p className={style.notes}>
                                {purchase.order.notes || '. . .'}
                            </p>
                        </div>
                        <div className={style.detail}>
                            <h3>Purchase Date</h3>
                            <p>{purchase.order.purchase_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
