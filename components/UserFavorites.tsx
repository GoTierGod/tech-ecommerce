'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../styles/user-favorites.module.css'
import {
    faCartShopping,
    faCheck,
    faEllipsisVertical,
    faHeart,
    faMoneyBill,
    faPen,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import { ComposedProductInfo } from '@/types/product'
import HorizontalCard from './HoritonzalCard'

interface UserFavoritesProps {
    favorites: ComposedProductInfo[]
}

export default function UserFavorites({ favorites }: UserFavoritesProps) {
    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.wrapperLeft}>
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
                <div className={style.wrapperRight}>
                    <div className={style.header}>
                        <h2>GoTierGod&apos;s Favorites</h2>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div className={style.grid}>
                        {favorites.map(product => (
                            <div
                                key={product.details.id}
                                className={style.favItem}
                            >
                                <HorizontalCard product={product} />
                                <div className={style.favItemOptions}>
                                    <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
