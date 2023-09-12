import { cookies } from 'next/dist/client/components/headers'

import { API_URL } from '@/constants/back-end'
import { AuthTokens } from '@/types/tokens'
import { ComposedProductInfo } from '@/types/product'

export const getCart = async (): Promise<ComposedProductInfo[]> => {
    const authCookies = cookies().get('authTokens')

    if (authCookies) {
        let authTokens: AuthTokens | null = null
        try {
            authTokens = JSON.parse(authCookies.value)
        } catch (err) {
            return []
        }

        if (authTokens) {
            const res = await fetch(`${API_URL}/api/cart/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            if (res.ok) {
                return await res.json()
            }

            return []
        }
    }

    return []
}
