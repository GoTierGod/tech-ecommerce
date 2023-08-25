import { API_URL } from '@/constants/api'
import { Coupon } from '@/types/tables'
import { AuthTokens } from '@/types/tokens'
import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'

export const getCoupons = async (): Promise<Coupon[]> => {
    const authCookies = cookies().get('authTokens')

    if (authCookies) {
        let authTokens: AuthTokens | null = null
        try {
            authTokens = JSON.parse(authCookies.value)
        } catch (err) {
            redirect('/')
        }

        if (authTokens) {
            const res = await fetch(`${API_URL}/api/coupons/`, {
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
