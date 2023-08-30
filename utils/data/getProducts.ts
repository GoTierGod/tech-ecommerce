import { API_URL } from '@/constants/back-end'
import { ComposedProductInfo } from '@/types/product'

export const getProducts = async (
    queryParams: string
): Promise<ComposedProductInfo[]> => {
    const res = await fetch(`${API_URL}/api/products/${queryParams}`, {
        next: { revalidate: 3600 }
    })

    if (res.ok) return await res.json()

    return []
}
