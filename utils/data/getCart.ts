import { API_URL } from '@/constants/api'
import { ComposedProductInfo } from '@/types/product'
import { AuthTokens } from '@/types/tokens'
import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'

export const getCart = async (): Promise<ComposedProductInfo[] | [] | null> => {
    const authCookies = cookies().get('authTokens')

    if (authCookies) {
        let authTokens: AuthTokens | null = null
        try {
            authTokens = JSON.parse(authCookies.value)
        } catch (err) {
            redirect('/')
        }

        if (authTokens) {
            const res = await fetch(`${API_URL}/api/cart/`, {
                method: 'get',
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
