import { cookies, headers } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/constants/back-end'
import { AuthTokens } from '@/types/tokens'

export async function POST(req: NextRequest) {
    try {
        const forwardedFor = headers().get('X-Forwarded-For') as string

        const authCookies = cookies().get('authTokens')
        if (authCookies) {
            let authTokens: AuthTokens | null = null
            try {
                authTokens = JSON.parse(authCookies.value) as AuthTokens
            } catch (err) {
                cookies().delete('authTokens')

                return NextResponse.json(
                    { message: 'Invalid authentication credentials' },
                    { status: 401 }
                )
            }

            const logoutData: { refresh: string } = {
                refresh: authTokens.refresh
            }

            const res = await fetch(`${API_URL}/api/token/blacklist/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${authTokens.access}`,
                    'X-Forwarded-For': forwardedFor
                },
                body: JSON.stringify(logoutData)
            })

            if (res.ok) {
                cookies().delete('authTokens')
                return NextResponse.json(
                    { message: 'Successfully logged out' },
                    { status: 200 }
                )
            }
        }

        cookies().delete('authTokens')
        return NextResponse.json(
            { message: 'Missing authentication credentials' },
            { status: 401 }
        )
    } catch (err) {
        cookies().delete('authTokens')

        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
