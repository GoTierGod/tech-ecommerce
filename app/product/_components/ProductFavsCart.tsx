'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './product-favs-cart.module.css'
import {
    faCartShopping,
    faCheckToSlot,
    faHeart,
    faHeartPulse
} from '@fortawesome/free-solid-svg-icons'
import { useCallback, useMemo, useState } from 'react'

import { ComposedProductInfo } from '@/types/product'
import { useRouter } from 'next/navigation'

interface ProductFavsCartProps {
    product: ComposedProductInfo
    cart: ComposedProductInfo[]
    favorites: ComposedProductInfo[]
}

export default function ProductFavsCart({
    product,
    cart,
    favorites
}: ProductFavsCartProps) {
    const router = useRouter()
    const [waitingRes, setWaitingRes] = useState(false)

    const isInCart = useMemo(
        () => cart.find(item => item.details.id === product.details.id),
        [cart, product.details.id]
    )

    const isInFavs = useMemo(
        () => favorites.find(item => item.details.id === product.details.id),
        [favorites, product.details.id]
    )

    const cartAction = useCallback(async () => {
        if (!waitingRes) {
            setWaitingRes(true)

            if (isInCart) {
                const res = await fetch(
                    `/api/cart/delete?id=${product.details.id}`,
                    {
                        method: 'DELETE'
                    }
                )

                if (res.ok) router.refresh()
            } else {
                const res = await fetch(
                    `/api/${isInFavs ? 'favorites/move' : 'cart/add'}?id=${
                        product.details.id
                    }`,
                    {
                        method: isInFavs ? 'PATCH' : 'POST'
                    }
                )

                if (res.ok) router.refresh()
            }

            setWaitingRes(false)
        }
    }, [product.details.id, router, waitingRes, isInCart, isInFavs])

    const favsAction = useCallback(async () => {
        if (!waitingRes) {
            setWaitingRes(true)

            if (isInFavs) {
                const res = await fetch(
                    `/api/favorites/delete?ids=${product.details.id}`,
                    {
                        method: 'DELETE'
                    }
                )

                if (res.ok) router.refresh()
            } else {
                const res = await fetch(
                    `/api/${isInCart ? 'cart/move' : 'favorites/add'}?id=${
                        product.details.id
                    }`,
                    {
                        method: isInCart ? 'PATCH' : 'POST'
                    }
                )

                if (res.ok) router.refresh()
            }

            setWaitingRes(false)
        }
    }, [product.details.id, waitingRes, router, isInFavs, isInCart])

    return (
        <div className={style.wrapper}>
            <button
                onClick={cartAction}
                disabled={waitingRes}
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
                <FontAwesomeIcon
                    icon={!isInCart ? faCartShopping : faCheckToSlot}
                    style={{
                        animationIterationCount: 1,
                        animationDelay: '150ms',
                        animationDuration: '900ms'
                    }}
                />
                {isInFavs
                    ? 'Move to Cart'
                    : isInCart
                    ? 'Remove Item'
                    : 'Add to Cart'}
            </button>
            <button
                onClick={favsAction}
                disabled={waitingRes}
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
                <FontAwesomeIcon
                    icon={!isInFavs ? faHeart : faHeartPulse}
                    style={{
                        animationIterationCount: 1,
                        animationDelay: '150ms',
                        animationDuration: '900ms'
                    }}
                />
                {isInCart
                    ? 'Move to Favs'
                    : isInFavs
                    ? 'Remove Item'
                    : 'Add to Favs'}
            </button>
        </div>
    )
}
