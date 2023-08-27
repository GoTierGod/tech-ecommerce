'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../styles/purchase-history.module.css'
import {
    faBoxOpen,
    faEllipsisVertical,
    faExclamation,
    faFile,
    faListUl
} from '@fortawesome/free-solid-svg-icons'
import { ComposedPurchaseInfo } from '@/types/purchase'
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState
} from 'react'
import HorizontalCard from './HoritonzalCard'
import Link from 'next/link'

interface PurchaseHistoryProps {
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
        <div className={style.historyItem}>
            <HorizontalCard product={purchase.product} />
            <button className={style.historyItemOptions} onClick={toggleMenu}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <Link
                className={style.linkOption}
                href={`/purchase/history/details/${purchase.order_item.id}`}
                prefetch={false}
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
            >
                <FontAwesomeIcon icon={faListUl} />
            </Link>
            <Link
                className={style.linkOption}
                href={purchase.order.delivered ? `/` : `/`}
                prefetch={false}
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
            >
                <FontAwesomeIcon
                    icon={purchase.order.delivered ? faFile : faExclamation}
                />
            </Link>
        </div>
    )
}

export default function PurchaseHistory({ history }: PurchaseHistoryProps) {
    const [openedOptions, setOpenedOptions] = useState(null as null | number)

    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.wrapperLeft}>
                    <div className={style.stickyWrapper}>
                        <div className={style.header}>
                            <h2>History actions</h2>
                        </div>
                        <div className={style.content}>
                            <span>
                                <FontAwesomeIcon icon={faListUl} />
                                <span>
                                    View details about the purchase (e.g.
                                    product, delivery, price, etc...)
                                </span>
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faExclamation} />
                                <span>
                                    Report a problem with the product, delivery,
                                    etc... or cancel your purchase
                                </span>
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faFile} />
                                <span>Leave a review for this product</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={style.wrapperRight}>
                    <div className={style.options}>
                        <div className={style.header}>
                            <h2>GoTierGod&apos;s purchase history</h2>
                            <FontAwesomeIcon icon={faBoxOpen} />
                        </div>
                    </div>
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
                            <h3>Your cart is empty</h3>
                            <p>
                                At this moment you do not have products added to
                                your cart, check out our offers!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
