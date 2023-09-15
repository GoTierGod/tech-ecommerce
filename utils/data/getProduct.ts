import { API_URL } from '@/constants/back-end'
import { ComposedProductInfo } from '@/types/product'
import { headers } from 'next/dist/client/components/headers'

export const getProduct = async (
    id: string
): Promise<ComposedProductInfo | null> => {
    try {
        const forwardedFor = headers().get('X-Forwarded-For')

        const res = await fetch(`${API_URL}/api/products/${id}`, {
            next: { revalidate: 3600 },
            headers: {
                'Content-Type': 'application/json',
                ...(forwardedFor && { 'X-Forwarded-For': forwardedFor })
            }
        })

        if (!res.ok) return null

        return res.json()
    } catch (err) {
        return null
    }
}
