import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/constants/api'
import { AuthTokens } from '@/types/tokens'
import { APIResponse } from '@/types/response'

export async function POST(req: NextRequest) {
    try {
        const authCookies = cookies().get('authTokens')

        if (authCookies) {
            const body = await req.json()

            let authTokens: AuthTokens | null = null
            try {
                authTokens = JSON.parse(authCookies.value) as AuthTokens
            } catch (err) {
                cookies().delete('authTokens')

                return NextResponse.json(
                    { message: 'Invalid authentication credientals' },
                    { status: 401 }
                )
            }

            const userDeleteData: { password: string } = {
                password: body.password
            }

            const res = await fetch(`${API_URL}/api/customer/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`
                },
                body: JSON.stringify(userDeleteData)
            })

            if (res.ok) {
                cookies().delete('authTokens')

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
            { message: 'Missing authentication credientals' },
            { status: 401 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
