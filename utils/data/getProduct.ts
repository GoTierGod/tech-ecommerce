import { API_URL } from '@/constants/api'
import { ComposedProductInfo } from '@/types/product'
import { cache } from 'react'

export const revalidate = 3600

export const getProduct = cache(
    async (id: string): Promise<ComposedProductInfo | null> => {
        const res = await fetch(`${API_URL}/api/products/${id}`)

        if (!res.ok) return null

        return res.json()
    }
)
