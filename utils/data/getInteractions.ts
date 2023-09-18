import { cookies, headers } from 'next/dist/client/components/headers'

import { API_URL } from '@/constants/back-end'
import { CustomerInteractions } from '@/types/customer'
import { AuthTokens } from '@/types/tokens'
import { APIResponse } from '@/types/response'

export const getInteractions = async (): Promise<CustomerInteractions> => {
    try {
        const forwardedFor = headers().get('X-Forwarded-For') as string

        const authCookies = cookies().get('authTokens')
        if (authCookies) {
            let authTokens: AuthTokens | null = null
            try {
                authTokens = JSON.parse(authCookies.value)
            } catch (err) {
                return { likes: [], dislikes: [], reports: [] }
            }

            if (authTokens) {
                const res = await fetch(
                    `${API_URL}/api/customer/interactions/`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authTokens.access}`,
                            'X-Forwarded-For': forwardedFor
                        }
                    }
                )

                if (res.ok) {
                    return await res.json()
                }

                if (res.status === 429) {
                    const errorResponse: APIResponse = await res.json()

                    throw new Error(
                        JSON.stringify({
                            status: res.status,
                            message:
                                errorResponse?.message || errorResponse?.detail
                        })
                    )
                }
            }
        }

        return { likes: [], dislikes: [], reports: [] }
    } catch (err) {
        return { likes: [], dislikes: [], reports: [] }
    }
}
