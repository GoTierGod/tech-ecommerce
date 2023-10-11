import { cookies, headers } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/constants/api'
import { APIResponse } from '@/types/response'
import { AuthTokens } from '@/types/tokens'

export async function PATCH(req: NextRequest) {
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

            const body = await req.json()
            const { id, rating, title, content } = body

            const reviewData: {
                rating?: number
                title?: string
                content?: string
            } = {
                ...(rating && { rating }),
                ...(title && { title }),
                ...(content && { content })
            }

            if (Object.keys(reviewData).length >= 1) {
                const res = await fetch(
                    `${API_URL}/api/reviews/product/${id}/update/`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${authTokens.access}`,
                            'X-Forwarded-For': forwardedFor
                        },
                        body: JSON.stringify(reviewData)
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
                { message: 'There is no data to be updated' },
                { status: 400 }
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
