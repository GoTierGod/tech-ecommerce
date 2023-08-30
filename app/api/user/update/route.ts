import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/constants/back-end'
import { AuthTokens } from '@/types/tokens'
import { APIResponse } from '@/types/response'

export async function PATCH(req: NextRequest) {
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

            const username = body.username
            const email = body.email
            const password = body.password
            const phone = body.phone
            const country = body.country
            const city = body.city
            const address = body.address
            const firstname = body.firstname
            const lastname = body.lastname
            const birthdate = body.birthdate
            const gender = body.gender

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
                ...(username && { username: username }),
                ...(email && { email: email }),
                ...(password && { password: password }),
                ...(phone && { phone: phone }),
                ...(country && { country: country }),
                ...(city && { city: city }),
                ...(address && { address: address }),
                ...(firstname && { firstname: firstname }),
                ...(lastname && { lastname: lastname }),
                ...(birthdate && { birthdate: birthdate }),
                ...(gender && { gender: gender })
            }

            if (Object.keys(updatedFields).length >= 1) {
                const res = await fetch(`${API_URL}/api/customer/update/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authTokens.access}`
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
                { message: 'Something went wrong' },
                { status: 400 }
            )
        } catch (err) {
            return NextResponse.json(
                { message: 'Something went wrong' },
                { status: 400 }
            )
        }
    }

    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
}
