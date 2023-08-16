import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'
import { apiUrl } from '@/helpers/apiUrl'
import { APIResponse } from '@/types/api-response'
import { UserDeleteRequestData } from '@/types/api-request'
import { UserTokens } from '@/types/tokens'

export async function POST(req: NextRequest) {
    const authTokens = cookies().get('authTokens')

    if (authTokens) {
        try {
            const body = await req.json()

            const userTokens: UserTokens = JSON.parse(authTokens.value)

            const password = body.password

            const userDeleteData: UserDeleteRequestData = {
                password: password
            }

            const res = await fetch(`${apiUrl}/api/customer/delete/`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userTokens.access}`
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
