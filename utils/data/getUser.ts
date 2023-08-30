import { cookies } from 'next/dist/client/components/headers'

import { API_URL } from '@/constants/back-end'
import { AuthTokens } from '@/types/tokens'
import { CustomerData } from '@/types/users'

export const getUser = async (): Promise<CustomerData> => {
    try {
        const authCookies = cookies().get('authTokens')

        if (authCookies) {
            const authTokens: AuthTokens = JSON.parse(authCookies.value)

            const res = await fetch(`${API_URL}/api/customer/`, {
                method: 'get',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            if (res.ok) {
                const data = await res.json()
                return data
            }
        }

        return null
    } catch (err) {
        return null
    }
}
