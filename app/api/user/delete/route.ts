import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/constants/back-end'
import { AuthTokens } from '@/types/tokens'
import { APIResponse } from '@/types/response'

export async function POST(req: NextRequest) {
    const authCookies = cookies().get('authTokens')

    if (authCookies) {
        try {
            const body = await req.json()

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
            return NextResponse.json(errorResponse, { status: res.status })
        } catch (err) {
            console.log(err)

            return NextResponse.json(
                { message: 'Something went wrong' },
                { status: 400 }
            )
        }
    }

    return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 400 }
    )
}
