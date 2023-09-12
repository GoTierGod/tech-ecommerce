import { API_URL } from '@/constants/back-end'
import { ComposedProductInfo } from '@/types/product'
import { AuthTokens } from '@/types/tokens'
import { cookies, headers } from 'next/dist/client/components/headers'

export const getProduct = async (
    id: string
): Promise<ComposedProductInfo | null> => {
    const forwardedFor = headers().get('X-Forwarded-For') as string

    const unauthenticatedReq = async () => {
        const res = await fetch(`${API_URL}/api/products/${id}`, {
            next: { revalidate: 3600 },
            headers: {
                'Content-Type': 'application/json',
                'X-Forwarded-For': forwardedFor
            }
        })

        if (res.ok) return res.json()

        return null
    }

    const authenticatedReq = async (tokens: AuthTokens) => {
        const res = await fetch(`${API_URL}/api/products/${id}`, {
            next: { revalidate: 3600 },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokens.access}`,
                'X-Forwarded-For': forwardedFor
            }
        })

        if (res.ok) return res.json()

        return null
    }

    const authCookies = cookies().get('authTokens')
    if (authCookies) {
        let authTokens: AuthTokens | null = null
        try {
            authTokens = JSON.parse(authCookies.value) as AuthTokens
        } catch (err) {
            return unauthenticatedReq()
        }

        return authenticatedReq(authTokens)
    }

    return unauthenticatedReq()
}
