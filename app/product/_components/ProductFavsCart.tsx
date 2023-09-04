'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './product-favs-cart.module.css'
import {
    faCartShopping,
    faCheckToSlot,
    faHeart,
    faHeartPulse
} from '@fortawesome/free-solid-svg-icons'
import { useCallback, useMemo } from 'react'

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

    const isInCart = useMemo(
        () => cart.find(item => item.details.id === product.details.id),
        [cart, product.details.id]
    )

    const isInFavs = useMemo(
        () => favorites.find(item => item.details.id === product.details.id),
        [favorites, product.details.id]
    )

    const cartAction = useCallback(async () => {
        if (!isInCart) {
            const res = await fetch(`/api/cart/add?id=${product.details.id}`, {
                method: 'POST'
            })

            if (res.ok) router.refresh()
        } else {
            const res = await fetch(
                `/api/cart/delete?id=${product.details.id}`,
                {
                    method: 'DELETE'
                }
            )

            if (res.ok) router.refresh()
        }
    }, [product.details.id, router, isInCart])

    const favsAction = useCallback(async () => {
        if (!isInFavs) {
            const res = await fetch(
                `/api/favorites/add?id=${product.details.id}`,
                {
                    method: 'POST'
                }
            )

            if (res.ok) router.refresh()
        } else {
            const res = await fetch(
                `/api/favorites/delete?ids=${product.details.id}`,
                {
                    method: 'DELETE'
                }
            )

            if (res.ok) router.refresh()
        }
    }, [product.details.id, router, isInFavs])

    return (
        <div className={style.wrapper}>
            <button onClick={cartAction}>
                <span>{!isInCart ? 'Add to Cart' : 'In Cart'}</span>
                <FontAwesomeIcon
                    icon={!isInCart ? faCartShopping : faCheckToSlot}
                />
            </button>
            <button onClick={favsAction}>
                <span>{!isInFavs ? 'Add to Favs' : 'In Favorites'}</span>
                <FontAwesomeIcon icon={!isInFavs ? faHeart : faHeartPulse} />
            </button>
        </div>
    )
}
