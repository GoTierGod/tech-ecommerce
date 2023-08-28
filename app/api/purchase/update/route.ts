import { API_URL } from '@/constants/api'
import { APIResponse } from '@/types/api-response'
import { AuthTokens } from '@/types/tokens'
import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

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

            const updatePurchaseData = {
                country: body.country,
                city: body.city,
                address: body.address,
                notes: body.notes
            }

            const res = await fetch(`${API_URL}/api/purchase/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${authTokens.access}`
                },
                body: JSON.stringify(updatePurchaseData)
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
