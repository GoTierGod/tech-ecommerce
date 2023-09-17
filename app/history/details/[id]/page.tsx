import style from './page.module.css'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl, faMicrochip } from '@fortawesome/free-solid-svg-icons'

import { Order } from '@/types/tables'
import { priceFormatter } from '@/utils/formatting/priceFormatter'
import { capitalizeFormatter } from '@/utils/formatting/capitalizeFormatter'
import { getPurchase } from '@/utils/data/getPurchase'
import { getCustomer } from '@/utils/data/getCustomer'
import Breadcrumbs from '@/components/Breadcrumbs'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const customer = getCustomer()
    if (!customer) redirect('/login')

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
            <Breadcrumbs
                routeList={[
                    { path: '/history', name: 'History' },
                    { path: '/history/details', name: 'Details' }
                ]}
            />
            <div className={style.wrapper}>
                <section className={style.wrapperLeft}>
                    <div className={style.stickyWrapper}>
                        <header className={style.header}>
                            <h2>{purchase.product.details.name}</h2>
                            <FontAwesomeIcon icon={faMicrochip} />
                        </header>
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
                                    priority
                                />
                            </div>
                            <div className={style.options}>
                                <Link href='/history' prefetch={false}>
                                    Back to History
                                </Link>
                                <Link
                                    href={`/product/${purchase.product.details.id}`}
                                    prefetch={false}
                                >
                                    See Product
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={style.wrapperRight}>
                    <header className={style.header}>
                        <h2>Details</h2>
                        <FontAwesomeIcon icon={faListUl} />
                    </header>
                    <div className={style.grid}>
                        <div className={style.detail}>
                            <h3>Address</h3>
                            <p>{`${purchase.order.country} / ${purchase.order.city} / ${purchase.order.address}`}</p>
                        </div>
                        <div className={style.detail}>
                            <h3>Payment Method</h3>
                            <p>
                                {capitalizeFormatter(
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
                                    {priceFormatter(
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
                </section>
            </div>
        </main>
    )
}
