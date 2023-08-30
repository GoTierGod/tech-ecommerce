import { redirect } from 'next/navigation'
import { cookies } from 'next/dist/client/components/headers'

import { API_URL } from '@/constants/back-end'
import { ComposedProductInfo } from '@/types/product'
import { AuthTokens } from '@/types/tokens'

export const getFavorites = async (): Promise<ComposedProductInfo[]> => {
    const authCookies = cookies().get('authTokens')

    if (authCookies) {
        let authTokens: AuthTokens | null = null
        try {
            authTokens = JSON.parse(authCookies.value)
        } catch (err) {
            redirect('/')
        }

        if (authTokens) {
            const res = await fetch(`${API_URL}/api/favorites/`, {
                method: 'get',
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
