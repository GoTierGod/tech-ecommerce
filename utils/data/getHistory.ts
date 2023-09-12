import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'

import { API_URL } from '@/constants/back-end'
import { ComposedPurchaseInfo } from '@/types/purchase'
import { AuthTokens } from '@/types/tokens'

export const getHistory = async (): Promise<ComposedPurchaseInfo[]> => {
    const authCookies = cookies().get('authTokens')

    if (authCookies) {
        let authTokens: AuthTokens | null = null
        try {
            authTokens = JSON.parse(authCookies.value)
        } catch (err) {
            redirect('/')
        }

        if (authTokens) {
            const res = await fetch(`${API_URL}/api/purchase/history/`, {
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
