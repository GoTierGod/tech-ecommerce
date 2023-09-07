'use client'

import style from './user-favorites.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCartShopping,
    faCheck,
    faCheckSquare,
    faEllipsisVertical,
    faHeart,
    faPen,
    faTrash,
    faXmark
} from '@fortawesome/free-solid-svg-icons'
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import { useRouter } from 'next/navigation'

import { ComposedProductInfo } from '@/types/product'
import HorizontalCard from '../../../components/HoritonzalCard'

interface UserFavoritesProps {
    favorites: ComposedProductInfo[]
}

interface FavItemProps {
    product: ComposedProductInfo
    openedOptions: null | number
    setOpenedOptions: Dispatch<SetStateAction<number | null>>
}

function FavItem({ product, openedOptions, setOpenedOptions }: FavItemProps) {
    const router = useRouter()
    const [optMenu, setOptMenu] = useState(false)
    const [waitingRes, setWaitingRes] = useState(false)
    const favItemRef = useRef(null)

    const toggleMenu = useCallback(() => {
        setOptMenu(prevOptMenu => !prevOptMenu)
        setOpenedOptions(product.details.id)
    }, [setOptMenu, setOpenedOptions, product.details.id])

    const favItemAction = useCallback(
        async (action: 'delete' | 'move') => {
            toggleMenu()

            if (!waitingRes) {
                setWaitingRes(true)

                let res
                if (action === 'delete') {
                    res = await fetch(
                        `/api/favorites/delete?ids=${product.details.id}`,
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
        <article className={style.favItem} ref={favItemRef}>
            <HorizontalCard product={product} />
            <button
                className={style.favItemOptions}
                onClick={toggleMenu}
                disabled={waitingRes}
                aria-label='Toggle options menu'
            >
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <button
                onClick={() => favItemAction('delete')}
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
                aria-label='Delete'
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
                onClick={() => favItemAction('move')}
                onMouseOver={e =>
                    e.currentTarget.firstElementChild?.classList.add('fa-shake')
                }
                onMouseOut={e =>
                    e.currentTarget.firstElementChild?.classList.remove(
                        'fa-shake'
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
                aria-label='Move to cart'
            >
                <FontAwesomeIcon
                    icon={faCartShopping}
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

export default function UserFavorites({ favorites }: UserFavoritesProps) {
    const router = useRouter()
    const [openedOptions, setOpenedOptions] = useState(null as null | number)
    const [selecting, setSelecting] = useState(false)
    const [selectedItems, setSelectedItems] = useState([] as Array<number>)

    const checkItem = useCallback(
        (id: number) => {
            setSelectedItems(prevSelectedItems => [id, ...prevSelectedItems])
        },
        [setSelectedItems]
    )

    const uncheckItem = useCallback(
        (id: number) => {
            setSelectedItems(prevSelectedItems =>
                prevSelectedItems.filter(thisId => thisId !== id)
            )
        },
        [setSelectedItems]
    )

    const handleCheck = useCallback(
        (id: number) => {
            if (selectedItems.includes(id)) {
                uncheckItem(id)
            } else {
                checkItem(id)
            }
        },
        [selectedItems, uncheckItem, checkItem]
    )

    const removeItems = useCallback(async () => {
        const res = await fetch(`/api/favorites/delete?ids=${selectedItems}`, {
            method: 'DELETE'
        })

        if (res.ok) {
            router.refresh()
        }

        setSelecting(false)
        setSelectedItems([])
    }, [selectedItems, router])

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
                                        Remove the product from your favorites
                                    </span>
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    <span>Move the product to your cart</span>
                                </p>
                            </div>
                        </article>
                        <article className={style.selectAndRemove}>
                            <header className={style.header}>
                                <h2>Select and Remove</h2>
                                <FontAwesomeIcon icon={faTrash} />
                            </header>
                            <div className={style.content}>
                                {selecting ? (
                                    <button
                                        onClick={() => {
                                            setSelecting(false)
                                            setSelectedItems([])
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                        Cancel
                                    </button>
                                ) : (
                                    <button onClick={() => setSelecting(true)}>
                                        <FontAwesomeIcon icon={faCheck} />
                                        Start to select
                                    </button>
                                )}
                                {selecting ? (
                                    <button onClick={removeItems}>
                                        <FontAwesomeIcon icon={faTrash} />
                                        Remove {selectedItems.length}{' '}
                                        {selectedItems.length > 1
                                            ? 'products'
                                            : 'product'}
                                    </button>
                                ) : (
                                    <span>
                                        No selected items
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                )}
                            </div>
                        </article>
                    </div>
                </section>
                <section className={style.wrapperRight}>
                    <header className={style.header}>
                        <h2>GoTierGod&apos;s Favorites</h2>
                        <FontAwesomeIcon icon={faHeart} />
                    </header>
                    {favorites.length > 0 ? (
                        <div className={style.grid}>
                            {favorites.map(product => (
                                <div
                                    className={style.checkWrapper}
                                    key={product.details.id}
                                >
                                    <FavItem
                                        product={product}
                                        openedOptions={openedOptions}
                                        setOpenedOptions={setOpenedOptions}
                                    />
                                    {selecting && (
                                        <button
                                            className={style.checkButton}
                                            onClick={() =>
                                                handleCheck(product.details.id)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faCheckSquare}
                                                color={
                                                    selectedItems.includes(
                                                        product.details.id
                                                    )
                                                        ? 'var(--main)'
                                                        : 'var(--gray)'
                                                }
                                            />
                                        </button>
                                    )}
                                </div>
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
                </section>
            </div>
        </main>
    )
}
