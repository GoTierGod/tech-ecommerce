import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/constants/back-end'
import { AuthTokens } from '@/types/tokens'
import { APIResponse } from '@/types/response'

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

            const body = await req.json()

            const id = body.id
            const country = body.country
            const city = body.city
            const address = body.address
            const notes = body.notes

            const updatePurchaseData: {
                country?: string
                city?: string
                address?: string
                notes?: string
            } = {
                ...(country && { country: body }),
                ...(city && { city: city }),
                ...(address && { address: body }),
                ...(notes && { notes: body })
            }

            if (Object.keys(updatePurchaseData).length >= 1) {
                const res = await fetch(
                    `${API_URL}/api/purchase/update/${id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${authTokens.access}`
                        },
                        body: JSON.stringify(updatePurchaseData)
                    }
                )

                if (res.ok) {
                    const apiResponse: APIResponse = await res.json()
                    return NextResponse.json(apiResponse, { status: 200 })
                }

                const errorResponse: APIResponse = await res.json()
                return NextResponse.json(errorResponse, { status: res.status })
            }

            return NextResponse.json(
                { message: 'Something went wrong' },
                { status: 400 }
            )
        }
    } catch (err) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
