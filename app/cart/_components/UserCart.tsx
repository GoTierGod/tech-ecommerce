'use client'

import style from './user-cart.module.css'

import { ComposedProductInfo } from '@/types/product'
import {
    faCartShopping,
    faEllipsisVertical,
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

    const deleteAnimation = useCallback(() => {
        if (cartItemRef.current) {
            const card: HTMLDivElement = cartItemRef.current
            card.style.height = '0'
            card.style.width = '0'
            card.style.opacity = '0'
            setTimeout(() => (card.style.display = 'none'), 350)
        }
    }, [cartItemRef])

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

                if (res.ok)
                    setTimeout(() => {
                        deleteAnimation()
                    }, 600)
                router.refresh()
            }
        },
        [toggleMenu, waitingRes, product.details.id, deleteAnimation, router]
    )

    useEffect(() => {
        if (openedOptions !== product.details.id) setOptMenu(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openedOptions])

    return (
        <div className={style.cartItem} ref={cartItemRef}>
            <div
                className={style.loadingAction}
                style={
                    waitingRes
                        ? {
                              width: '100%',
                              height: '100%'
                          }
                        : {
                              width: '0',
                              height: '0'
                          }
                }
            >
                {
                    <h2
                        style={
                            waitingRes
                                ? {
                                      color: 'var(--gray)'
                                  }
                                : {
                                      color: 'transparent'
                                  }
                        }
                    >
                        {waitingRes ? 'Waiting...' : 'Successfull'}
                    </h2>
                }
            </div>
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
                <FontAwesomeIcon icon={faTrash} />
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
                <FontAwesomeIcon icon={faHeart} />
            </button>
        </div>
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
                <div className={style.wrapperLeft}>
                    <div className={style.stickyWrapper}>
                        <div className={style.options}>
                            <div className={style.header}>
                                <h2>Options</h2>
                                <FontAwesomeIcon icon={faPen} />
                            </div>
                            <div className={style.content}>
                                <span>
                                    <FontAwesomeIcon icon={faTrash} />
                                    <span>
                                        Remove the product from your cart
                                    </span>
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    <span>
                                        Move the product to your favorites
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className={style.cartDetails}>
                            <div className={style.header}>
                                <h2>Details</h2>
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                            <div className={style.content}>
                                <div className={style.cartPrices}>
                                    <div>
                                        <span>Products</span>
                                        <span>{cart.length} / 10</span>
                                    </div>
                                    <div>
                                        <span>Normal Total</span>
                                        <span>
                                            {priceStringFormatter(normalTotal)}
                                        </span>
                                    </div>
                                    <div>
                                        <span>Offer Total</span>
                                        <span>
                                            {priceStringFormatter(offerTotal)}
                                        </span>
                                    </div>
                                    <div>
                                        <span>Cart Offer</span>
                                        <span>-{cart.length}%</span>
                                    </div>
                                </div>
                                <div className={style.cartTotal}>
                                    <div>
                                        <span>Total</span>
                                        <span>
                                            {priceStringFormatter(
                                                cartOfferTotal
                                            )}
                                        </span>
                                    </div>
                                    <div>
                                        <span>Savings</span>
                                        <span>
                                            {priceStringFormatter(
                                                normalTotal - cartOfferTotal
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <Link href='/cart/purchase' prefetch={false}>
                                    Buy this Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.wrapperRight}>
                    <div className={style.header}>
                        <h2>GoTierGod&apos;s Cart</h2>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
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
                </div>
            </div>
        </main>
    )
}
