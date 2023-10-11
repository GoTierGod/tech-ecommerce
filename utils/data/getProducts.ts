import { headers } from 'next/dist/client/components/headers'

import { API_URL } from '@/constants/api'
import { ComposedProductInfo } from '@/types/product'
import { APIResponse } from '@/types/response'

export const getProducts = async (
    queryParams: string
): Promise<ComposedProductInfo[]> => {
    try {
        const forwardedFor = headers().get('X-Forwarded-For')

        const res = await fetch(`${API_URL}/api/products/${queryParams}`, {
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

        return []
    } catch (err) {
        return []
    }
}
