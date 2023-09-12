import { cookies, headers } from 'next/dist/client/components/headers'

import { CustomerData } from '@/types/users'
import { API_URL } from '@/constants/back-end'
import { AuthTokens } from '@/types/tokens'

export const getCustomer = async (): Promise<CustomerData> => {
    try {
        const forwardedFor = headers().get('X-Forwarded-For') as string

        const authCookies = cookies().get('authTokens')
        if (authCookies) {
            let authTokens: AuthTokens | null = null
            try {
                authTokens = JSON.parse(authCookies.value) as AuthTokens
            } catch (err) {
                return null
            }

            const res = await fetch(`${API_URL}/api/customer/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`,
                    'X-Forwarded-For': forwardedFor
                }
            })

            if (res.ok) return res.json()

            return null
        }

        return null
    } catch (err) {
        return null
    }
}
