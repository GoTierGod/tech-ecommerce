import { cookies, headers } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'

import { API_URL } from '@/constants/back-end'
import { Coupon } from '@/types/tables'
import { AuthTokens } from '@/types/tokens'

export const getCoupons = async (): Promise<Coupon[]> => {
    try {
        const forwardedFor = headers().get('X-Forwarded-For') as string

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
                        Authorization: `Bearer ${authTokens.access}`,
                        'X-Forwarded-For': forwardedFor
                    }
                })

                if (res.ok) {
                    return await res.json()
                }

                return []
            }
        }

        return []
    } catch (err) {
        return []
    }
}
