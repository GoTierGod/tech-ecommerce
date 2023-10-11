import { cookies, headers } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/constants/api'
import { APIResponse } from '@/types/response'
import { AuthTokens } from '@/types/tokens'

export async function DELETE(req: NextRequest) {
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

            const { searchParams } = new URL(req.url)
            const id = searchParams.get('id')

            const res = await fetch(
                `${API_URL}/api/reviews/product/${id}/delete/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${authTokens.access}`,
                        'X-Forwarded-For': forwardedFor
                    }
                }
            )

            if (res.ok) {
                const apiResponse: APIResponse = await res.json()
                return NextResponse.json(apiResponse, { status: 200 })
            }

            const errorResponse: APIResponse = await res.json()
            return NextResponse.json(
                {
                    message:
                        errorResponse?.message ||
                        errorResponse?.detail ||
                        'Something went wrong'
                },
                { status: res.status }
            )
        }

        return NextResponse.json(
            { message: 'Missing authentication credentials' },
            { status: 401 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
