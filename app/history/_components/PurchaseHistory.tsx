'use client'

import style from './purchase-history.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBoxOpen,
    faEllipsisVertical,
    faExclamation,
    faFile,
    faListUl
} from '@fortawesome/free-solid-svg-icons'
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState
} from 'react'
import Link from 'next/link'

import { ComposedPurchaseInfo } from '@/types/purchase'
import HorizontalCard from '@/components/HoritonzalCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Customer } from '@/types/users'

interface PurchaseHistoryProps {
    customer: Customer
    history: ComposedPurchaseInfo[]
}

interface HistoryItemProps {
    purchase: ComposedPurchaseInfo
    openedOptions: null | number
    setOpenedOptions: Dispatch<SetStateAction<number | null>>
}

function HistoryItem({
    purchase,
    openedOptions,
    setOpenedOptions
}: HistoryItemProps) {
    const [optMenu, setOptMenu] = useState(false)

    const toggleMenu = useCallback(() => {
        setOptMenu(prevOptMenu => !prevOptMenu)
        setOpenedOptions(purchase.order_item.id)
    }, [setOptMenu, setOpenedOptions, purchase.order_item.id])

    useEffect(() => {
        if (openedOptions !== purchase.order_item.id) setOptMenu(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openedOptions])

    return (
        <article className={style.historyItem}>
            <HorizontalCard product={purchase.product} />
            <button
                className={style.historyItemOptions}
                onClick={toggleMenu}
                aria-label='Toggle options menu'
            >
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <Link
                className={style.linkOption}
                href={`/history/details/${purchase.order_item.id}`}
                prefetch={false}
                onMouseOver={e =>
                    e.currentTarget.firstElementChild?.classList.add(
                        'fa-bounce'
                    )
                }
                onMouseOut={e =>
                    e.currentTarget.firstElementChild?.classList.remove(
                        'fa-bounce'
                    )
                }
                style={
                    optMenu
                        ? {
                              transform: 'scale(1)',
                              right: '3rem',
                              top: '1rem'
                          }
                        : {
                              transform: 'scale(0)',
                              right: '2px',
                              top: '2px'
                          }
                }
                aria-label='Purchase details'
            >
                <FontAwesomeIcon
                    icon={faListUl}
                    style={{
                        animationIterationCount: 1,
                        animationDelay: '150ms',
                        animationDuration: '900ms'
                    }}
                />
            </Link>
            <Link
                className={style.linkOption}
                href={
                    purchase.order.delivered
                        ? `/history/review/${purchase.order_item.id}`
                        : `/history/report/${purchase.order_item.id}`
                }
                prefetch={false}
                onMouseOver={e =>
                    e.currentTarget.firstElementChild?.classList.add(
                        purchase.order.delivered ? 'fa-bounce' : 'fa-shake'
                    )
                }
                onMouseOut={e =>
                    e.currentTarget.firstElementChild?.classList.remove(
                        purchase.order.delivered ? 'fa-bounce' : 'fa-shake'
                    )
                }
                style={
                    optMenu
                        ? {
                              transform: 'scale(1)',
                              right: '1rem',
                              top: '3.5rem'
                          }
                        : {
                              transform: 'scale(0)',
                              right: '2px',
                              top: '2px'
                          }
                }
                aria-label={
                    purchase.order.delivered ? 'Review' : 'Report a problem'
                }
            >
                <FontAwesomeIcon
                    icon={purchase.order.delivered ? faFile : faExclamation}
                    style={{
                        animationIterationCount: 1,
                        animationDelay: '150ms',
                        animationDuration: '900ms'
                    }}
                />
            </Link>
        </article>
    )
}

export default function PurchaseHistory({
    customer,
    history
}: PurchaseHistoryProps) {
    const [openedOptions, setOpenedOptions] = useState(null as null | number)

    return (
        <main>
            <Breadcrumbs routeList={[{ path: '/history', name: 'History' }]} />
            <div className={style.wrapper}>
                <section className={style.wrapperLeft}>
                    <div className={style.stickyWrapper}>
                        <header className={style.header}>
                            <h2>History actions</h2>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </header>
                        <div className={style.content}>
                            <p>
                                <FontAwesomeIcon icon={faListUl} />
                                <span>
                                    View details about the purchase (e.g.
                                    product, delivery, price, etc...)
                                </span>
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faExclamation} />
                                <span>
                                    Report a problem with the product, delivery,
                                    etc... or cancel your purchase
                                </span>
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faFile} />
                                <span>Leave a review for this product</span>
                            </p>
                        </div>
                    </div>
                </section>
                <section className={style.wrapperRight}>
                    <header className={style.header}>
                        <h2>
                            {customer.user.username}&apos;s Purchase History
                        </h2>
                        <FontAwesomeIcon icon={faBoxOpen} />
                    </header>
                    {history.length > 0 ? (
                        <div className={style.grid}>
                            {history.map(purchase => (
                                <HistoryItem
                                    key={purchase.order_item.id}
                                    purchase={purchase}
                                    openedOptions={openedOptions}
                                    setOpenedOptions={setOpenedOptions}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={style.empty}>
                            <h3>Your history is empty</h3>
                            <p>
                                At this moment you do not have purchased
                                products, check out our offers!
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}
