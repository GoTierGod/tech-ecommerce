'use client'

import style from './user-favorites.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCartShopping,
    faCheck,
    faCheckCircle,
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
        <div className={style.favItem} ref={favItemRef}>
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
                        <div className={style.selectAndRemove}>
                            <div className={style.header}>
                                <h2>Select and Remove</h2>
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                            <div className={style.content}>
                                {selecting ? (
                                    <button
                                        onClick={() => {
                                            setSelecting(false)
                                            setSelectedItems([])
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                        <span>Cancel</span>
                                    </button>
                                ) : (
                                    <button onClick={() => setSelecting(true)}>
                                        <FontAwesomeIcon icon={faCheck} />
                                        <span>Start to select</span>
                                    </button>
                                )}
                                {selecting ? (
                                    <button onClick={removeItems}>
                                        <FontAwesomeIcon icon={faTrash} />
                                        <span>
                                            Remove {selectedItems.length}{' '}
                                            {selectedItems.length > 1
                                                ? 'products'
                                                : 'product'}
                                        </span>
                                    </button>
                                ) : (
                                    <button>
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                        <span>No selected items</span>
                                    </button>
                                )}
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
                                                icon={faCheckCircle}
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
                </div>
            </div>
        </main>
    )
}
