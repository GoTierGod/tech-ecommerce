import { API_URL } from '@/constants/api'
import { APIResponse } from '@/types/api-response'
import { AuthTokens } from '@/types/tokens'
import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
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

            const { searchParams } = new URL(req.url)
            const id = searchParams.get('id')

            const res = await fetch(`${API_URL}/api/cart/move/${id}`, {
                method: 'PATCH',
                headers: { authorization: `Bearer ${authTokens.access}` }
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
