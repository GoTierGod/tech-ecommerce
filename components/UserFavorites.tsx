'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../styles/user-favorites.module.css'
import {
    faCartShopping,
    faCheck,
    faEllipsisVertical,
    faHeart,
    faPen,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import { ComposedProductInfo } from '@/types/product'
import HorizontalCard from './HoritonzalCard'
import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface UserFavoritesProps {
    favorites: ComposedProductInfo[]
}

interface FavItemProps {
    product: ComposedProductInfo
}

function FavItem({ product }: FavItemProps) {
    const router = useRouter()
    const [optMenu, setOptMenu] = useState(false)
    const [waitingRes, setWaitingRes] = useState(false)
    const favItemRef = useRef(null)

    const toggleMenu = useCallback(
        () => setOptMenu(prevOptMenu => !prevOptMenu),
        [setOptMenu]
    )

    const deleteAnimation = useCallback(() => {
        if (favItemRef.current) {
            const card: HTMLDivElement = favItemRef.current
            card.style.height = '0'
            card.style.width = '0'
            card.style.opacity = '0'
            setTimeout(() => (card.style.display = 'none'), 350)
        }
    }, [favItemRef])

    const favItemAction = useCallback(
        async (action: 'delete' | 'move') => {
            toggleMenu()

            if (!waitingRes) {
                setWaitingRes(true)

                let res
                if (action === 'delete') {
                    res = await fetch(
                        `/api/favorites/delete?id=${product.details.id}`,
                        {
                            method: 'DELETE'
                        }
                    )
                } else {
                    res = await fetch(
                        `/api/favorites/move?id=${product.details.id}`,
                        {
                            method: 'PATCH'
                        }
                    )
                }

                if (res.ok)
                    setTimeout(() => {
                        deleteAnimation()
                    }, 600)
                else router.refresh()

                setTimeout(() => {
                    setWaitingRes(false)
                }, 600)
            }
        },
        [toggleMenu, waitingRes, product.details.id, deleteAnimation, router]
    )

    return (
        <div className={style.favItem} ref={favItemRef}>
            <div
                className={style.loadingAction}
                style={
                    waitingRes
                        ? {
                              width: '100%',
                              height: '170px'
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
                className={style.favItemOptions}
                onClick={toggleMenu}
                disabled={waitingRes}
            >
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <button
                onClick={() => favItemAction('delete')}
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
                onClick={() => favItemAction('move')}
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

export default function UserFavorites({ favorites }: UserFavoritesProps) {
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
                                        Remove the product from your favorites
                                    </span>
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    <span>Move the product to your cart</span>
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
                        <h2>GoTierGod&apos;s Favorites</h2>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    {favorites.length > 0 ? (
                        <div className={style.grid}>
                            {favorites.map(product => (
                                <FavItem
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
