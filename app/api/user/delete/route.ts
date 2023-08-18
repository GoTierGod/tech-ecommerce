import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'
import { apiUrl } from '@/helpers/apiUrl'
import { APIResponse } from '@/types/api-response'
import { UserDeleteRequestData } from '@/types/api-request'
import { AuthTokens } from '@/types/tokens'

export async function POST(req: NextRequest) {
    const authCookies = cookies().get('authTokens')

    if (authCookies) {
        try {
            const body = await req.json()

            const authTokens: AuthTokens = JSON.parse(authCookies.value)

            const userDeleteData: UserDeleteRequestData = {
                password: body.password
            }

            const res = await fetch(`${apiUrl}/api/customer/delete/`, {
                method: 'delete',
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
