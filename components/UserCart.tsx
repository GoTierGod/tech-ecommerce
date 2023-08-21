'use client'

import style from '../styles/user-cart.module.css'

import { ComposedProductInfo } from '@/types/product'
import {
    faCartShopping,
    faCheck,
    faEllipsisVertical,
    faHeart,
    faPen,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import HorizontalCard from './HoritonzalCard'

interface UserCartProps {
    cart: ComposedProductInfo[]
}

interface CartItemProps {
    product: ComposedProductInfo
}

function CartItem({ product }: CartItemProps) {
    const router = useRouter()
    const [optMenu, setOptMenu] = useState(false)
    const [waitingRes, setWaitingRes] = useState(false)
    const cartItemRef = useRef(null)

    const toggleMenu = useCallback(
        () => setOptMenu(prevOptMenu => !prevOptMenu),
        [setOptMenu]
    )

    const deleteAnimation = useCallback(() => {
        if (cartItemRef.current) {
            const card: HTMLDivElement = cartItemRef.current
            card.style.left = '100vw'
            card.style.opacity = '0'
            setTimeout(() => (card.style.display = 'none'), 600)
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

                if (res.ok) deleteAnimation()
                else router.refresh()

                setWaitingRes(false)
            }
        },
        [toggleMenu, waitingRes, product.details.id, deleteAnimation, router]
    )

    return (
        <div className={style.cartItem} ref={cartItemRef}>
            <HorizontalCard product={product} />
            <button className={style.cartItemOptions} onClick={toggleMenu}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <button
                onClick={() => cartItemAction('delete')}
                disabled={waitingRes}
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
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
                onClick={() => cartItemAction('move')}
                disabled={waitingRes}
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
                <FontAwesomeIcon icon={faCartShopping} />
            </button>
        </div>
    )
}

export default function UserCart({ cart }: UserCartProps) {
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
                        <div className={style.markAndDelete}>
                            <div className={style.header}>
                                <h2>Mark and Delete</h2>
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                            <div className={style.content}>
                                <button>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <span>Mark products</span>
                                </button>
                                <button>
                                    <FontAwesomeIcon icon={faTrash} />
                                    <span>Delete marked products</span>
                                </button>
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
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={style.empty}>
                            <h3>No favorites!</h3>
                            <p>
                                At this moment you do not have products marked
                                as favorites, check out our offers!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
