import { API_URL } from '@/constants/back-end'
import { ComposedProductInfo } from '@/types/product'
import { APIResponse } from '@/types/response'
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

        if (res.ok) return await res.json()

        if (res.status === 429) {
            const errorResponse: APIResponse = await res.json()

            throw new Error(
                JSON.stringify({
                    status: res.status,
                    message: errorResponse?.message || errorResponse?.detail
                })
            )
        }

        return null
    } catch (err) {
        return null
    }
}
