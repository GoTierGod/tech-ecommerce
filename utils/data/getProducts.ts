import { headers } from 'next/dist/client/components/headers'

import { API_URL } from '@/constants/back-end'
import { ComposedProductInfo } from '@/types/product'

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

        return []
    } catch (err) {
        return []
    }
}
