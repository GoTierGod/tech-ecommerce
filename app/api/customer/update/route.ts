import { cookies, headers } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/constants/back-end'
import { AuthTokens } from '@/types/tokens'
import { APIResponse } from '@/types/response'

export async function PATCH(req: NextRequest) {
    try {
        const forwardedFor = headers().get('X-Forwarded-For') as string

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

            const {
                username,
                email,
                password,
                phone,
                country,
                city,
                address,
                firstname,
                lastname,
                birthdate,
                gender
            } = body

            const updatedFields: {
                username?: string
                email?: string
                password?: string
                phone?: string
                country?: string
                city?: string
                address?: string
                firstname?: string
                lastname?: string
                birthdate?: string
                gender?: string
            } = {
                ...(username && { username }),
                ...(email && { email }),
                ...(password && { password }),
                ...(phone && { phone }),
                ...(country && { country }),
                ...(city && { city }),
                ...(address && { address }),
                ...(firstname && { firstname }),
                ...(lastname && { lastname }),
                ...(birthdate && { birthdate }),
                ...(gender && { gender })
            }

            if (Object.keys(updatedFields).length >= 1) {
                const res = await fetch(`${API_URL}/api/customer/update/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authTokens.access}`,
                        'X-Forwarded-For': forwardedFor
                    },
                    body: JSON.stringify(updatedFields)
                })

                if (res.ok) {
                    const apiResponse: APIResponse = await res.json()
                    return NextResponse.json(apiResponse, { status: 200 })
                }

                const errorResponse: APIResponse = await res.json()
                return NextResponse.json(errorResponse, { status: res.status })
            }

            return NextResponse.json(
                { message: 'There is no data to be updated' },
                { status: 401 }
            )
        }

        return NextResponse.json(
            { message: 'Missing authentication credientals' },
            { status: 401 }
        )
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
