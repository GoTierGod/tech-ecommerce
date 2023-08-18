import { API_URL } from '@/constants/api'
import { ComposedProductInfo } from '@/types/product'

export const getProduct = async (
    id: string
): Promise<ComposedProductInfo | null> => {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
        next: { revalidate: 3600 }
    })

    if (!res.ok) return null

    return res.json()
}
