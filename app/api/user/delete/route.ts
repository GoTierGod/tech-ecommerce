import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'
import { APIResponse, UserTokens } from '../../auth/login/route'
import { apiUrl } from '@/helpers/apiUrl'

export async function POST(req: NextRequest) {
    const authTokens = cookies().get('authTokens')

    if (authTokens) {
        try {
            const body = await req.json()

            const userTokens: UserTokens = JSON.parse(authTokens.value)

            const password = body.password

            const res = await fetch(`${apiUrl}/api/customer/delete/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userTokens.access}`
                },
                body: JSON.stringify({
                    password: password
                })
            })

            if (res.ok) {
                cookies().delete('authTokens')

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

    return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 400 }
    )
}
