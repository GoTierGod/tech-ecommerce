import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/constants/back-end'
import { APIResponse } from '@/types/response'
import { AuthTokens } from '@/types/tokens'

export async function POST(req: NextRequest) {
    try {
        const authCookies = cookies().get('authTokens')

        if (authCookies) {
            let authTokens: AuthTokens | null = null
            try {
                authTokens = JSON.parse(authCookies.value) as AuthTokens
            } catch (err) {
                cookies().delete('authTokens')

                return NextResponse.json(
                    { message: 'Invalid tokens' },
                    { status: 401 }
                )
            }

            const body = await req.json()

            const id = body.id

            const reviewData: {
                rating: number
                title: string
                content: string
            } = {
                rating: body.rating,
                title: body.title,
                content: body.content
            }

            const res = await fetch(`${API_URL}/api/reviews/create/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${authTokens.access}`
                },
                body: JSON.stringify(reviewData)
            })

            if (res.ok) {
                const apiResponse: APIResponse = await res.json()
                return NextResponse.json(apiResponse, { status: 200 })
            }

            const errorResponse: APIResponse = await res.json()
            return NextResponse.json(errorResponse, { status: res.status })
        }
    } catch (err) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
