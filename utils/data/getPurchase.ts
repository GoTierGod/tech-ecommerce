import { API_URL } from '@/constants/api'
import { ComposedPurchaseInfo } from '@/types/purchase'
import { AuthTokens } from '@/types/tokens'
import { cookies } from 'next/dist/client/components/headers'

export const getPurchase = async (
    id: string
): Promise<ComposedPurchaseInfo | null> => {
    const authCookies = cookies().get('authTokens')

    if (authCookies) {
        let authTokens: AuthTokens | null = null
        try {
            authTokens = JSON.parse(authCookies.value)
        } catch (err) {
            return null
        }

        if (authTokens) {
            const res = await fetch(`${API_URL}/api/purchase/history/${id}`, {
                next: { revalidate: 3600 },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            if (res.ok) {
                return await res.json()
            }

            return null
        }
    }

    return null
}
