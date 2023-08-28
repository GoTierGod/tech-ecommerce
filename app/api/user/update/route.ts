import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'
import { APIResponse } from '@/types/api-response'
import { AuthTokens } from '@/types/tokens'
import { API_URL } from '@/constants/api'

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

            const fields: { key: string; value: string | undefined }[] = [
                { key: 'username', value: username },
                { key: 'email', value: email },
                { key: 'password', value: password },
                { key: 'phone', value: phone },
                { key: 'country', value: country },
                { key: 'city', value: city },
                { key: 'address', value: address },
                { key: 'firstname', value: firstname },
                { key: 'lastname', value: lastname },
                { key: 'birthdate', value: birthdate },
                { key: 'gender', value: gender }
            ]

            const updatedFields: { [key: string]: string } = Object.fromEntries(
                fields
                    .filter(entry => entry.value !== undefined)
                    .map(entry => [entry.key, entry.value as string])
            )

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
        } catch (err) {
            return NextResponse.json(
                { message: 'Something went wrong' },
                { status: 400 }
            )
        }
    }

    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
}
