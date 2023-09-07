'use client'

import style from './user-cart.module.css'

import { ComposedProductInfo } from '@/types/product'
import {
    faEllipsisVertical,
    faGift,
    faHeart,
    faPen,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import Link from 'next/link'

import HorizontalCard from '../../../components/HoritonzalCard'
import { priceStringFormatter } from '@/utils/formatting/priceStringFormatter'

interface UserCartProps {
    cart: ComposedProductInfo[]
}

interface CartItemProps {
    product: ComposedProductInfo
    openedOptions: null | number
    setOpenedOptions: Dispatch<SetStateAction<number | null>>
}

function CartItem({ product, openedOptions, setOpenedOptions }: CartItemProps) {
    const router = useRouter()
    const [optMenu, setOptMenu] = useState(false)
    const [waitingRes, setWaitingRes] = useState(false)
    const cartItemRef = useRef(null)

    const toggleMenu = useCallback(() => {
        setOptMenu(prevOptMenu => !prevOptMenu)
        setOpenedOptions(product.details.id)
    }, [setOptMenu, setOpenedOptions, product.details.id])

    const cartItemAction = useCallback(
        async (action: 'delete' | 'move') => {
            toggleMenu()

            if (!waitingRes) {
                setWaitingRes(true)

                let res
                if (action === 'delete') {
                    res = await fetch(
                        `/api/cart/delete?id=${product.details.id}`,
                        {
                            method: 'DELETE'
                        }
                    )
                } else {
                    res = await fetch(
                        `/api/cart/move?id=${product.details.id}`,
                        {
                            method: 'PATCH'
                        }
                    )
                }

                if (res.ok) router.refresh()

                setWaitingRes(false)
            }
        },
        [toggleMenu, waitingRes, product.details.id, router]
    )

    useEffect(() => {
        if (openedOptions !== product.details.id) setOptMenu(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openedOptions])

    return (
        <article className={style.cartItem} ref={cartItemRef}>
            <HorizontalCard product={product} />
            <button
                className={style.cartItemOptions}
                onClick={toggleMenu}
                disabled={waitingRes}
            >
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <button
                onClick={() => cartItemAction('delete')}
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
                disabled={waitingRes}
                style={
                    optMenu
                        ? {
                              padding: '1rem',
                              width: '48px',
                              height: '48px',
                              right: '3rem',
                              top: '1rem',
                              borderWidth: '2px'
                          }
                        : {
                              padding: 0,
                              width: 0,
                              height: 0,
                              right: '1rem',
                              top: '1rem',
                              borderWidth: 0
                          }
                }
            >
                <FontAwesomeIcon
                    icon={faTrash}
                    style={{
                        animationIterationCount: 1,
                        animationDelay: '150ms',
                        animationDuration: '900ms'
                    }}
                />
            </button>
            <button
                onClick={() => cartItemAction('move')}
                onMouseOver={e =>
                    e.currentTarget.firstElementChild?.classList.add('fa-beat')
                }
                onMouseOut={e =>
                    e.currentTarget.firstElementChild?.classList.remove(
                        'fa-beat'
                    )
                }
                disabled={waitingRes}
                style={
                    optMenu
                        ? {
                              padding: '1rem',
                              width: '48px',
                              height: '48px',
                              right: '1rem',
                              top: '3.5rem',
                              borderWidth: '2px'
                          }
                        : {
                              padding: 0,
                              width: 0,
                              height: 0,
                              right: '1rem',
                              top: '1rem',
                              borderWidth: 0
                          }
                }
            >
                <FontAwesomeIcon
                    icon={faHeart}
                    style={{
                        animationIterationCount: 1,
                        animationDelay: '150ms',
                        animationDuration: '900ms'
                    }}
                />
            </button>
        </article>
    )
}

export default function UserCart({ cart }: UserCartProps) {
    const [openedOptions, setOpenedOptions] = useState(null as null | number)

    const normalTotal =
        cart.length > 0
            ? cart.map(p => Number(p.details.price)).reduce((p1, p2) => p1 + p2)
            : 0
    const offerTotal =
        cart.length > 0
            ? cart
                  .map(p => Number(p.details.offer_price))
                  .reduce((p1, p2) => p1 + p2)
            : 0
    const cartOfferTotal =
        cart.length > 0 ? offerTotal - (offerTotal * cart.length) / 100 : 0

    return (
        <main>
            <div className={style.wrapper}>
                <section className={style.wrapperLeft}>
                    <div className={style.stickyWrapper}>
                        <article className={style.options}>
                            <header className={style.header}>
                                <h2>Options</h2>
                                <FontAwesomeIcon icon={faPen} />
                            </header>
                            <div className={style.content}>
                                <p>
                                    <FontAwesomeIcon icon={faTrash} />
                                    <span>
                                        Remove the product from your cart
                                    </span>
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faHeart} />
                                    <span>
                                        Move the product to your favorites
                                    </span>
                                </p>
                            </div>
                        </article>
                        <article className={style.details}>
                            <header className={style.header}>
                                <h2>Details</h2>
                                <FontAwesomeIcon icon={faTrash} />
                            </header>
                            <div className={style.content}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Products</th>
                                            <td>{cart.length} / 10</td>
                                        </tr>
                                        <tr>
                                            <th>Normal</th>
                                            <td>
                                                {priceStringFormatter(
                                                    normalTotal
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Offer</th>
                                            <td>
                                                {priceStringFormatter(
                                                    offerTotal
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Cart Discount</th>
                                            <td>{cart.length} %</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td>
                                                {priceStringFormatter(
                                                    cartOfferTotal
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Savings</th>
                                            <td>
                                                {priceStringFormatter(
                                                    normalTotal - cartOfferTotal
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <span>
                                        {priceStringFormatter(cartOfferTotal)}
                                    </span>
                                    <Link
                                        href='/cart/purchase'
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
                                    >
                                        Buy this Cart
                                        <FontAwesomeIcon
                                            icon={faGift}
                                            style={{
                                                animationIterationCount: 1,
                                                animationDelay: '150ms',
                                                animationDuration: '900ms'
                                            }}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
                <section className={style.wrapperRight}>
                    <header className={style.header}>
                        <h2>GoTierGod&apos;s Cart</h2>
                        <FontAwesomeIcon icon={faHeart} />
                    </header>
                    {cart.length > 0 ? (
                        <div className={style.grid}>
                            {cart.map(product => (
                                <CartItem
                                    key={product.details.id}
                                    product={product}
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
                </section>
            </div>
        </main>
    )
}
