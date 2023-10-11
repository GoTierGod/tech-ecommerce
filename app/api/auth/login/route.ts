import { cookies, headers } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/constants/api'
import { AuthTokens } from '@/types/tokens'
import { APIResponse } from '@/types/response'

export async function POST(req: NextRequest) {
    try {
        const forwardedFor = headers().get('X-Forwarded-For') as string
        const body = await req.json()

        const loginData: { username: string; password: string } = {
            username: body.username,
            password: body.password
        }

        const res = await fetch(`${API_URL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Forwarded-For': forwardedFor
            },
            body: JSON.stringify(loginData)
        })

        if (res.ok) {
            const authTokens: AuthTokens = await res.json()

            cookies().set('authTokens', JSON.stringify(authTokens))

            return NextResponse.json(
                { message: 'Successfully logged in' },
                { status: 200 }
            )
        }

        const errorResponse: APIResponse = await res.json()
        return NextResponse.json(
            {
                message:
                    errorResponse?.message ||
                    errorResponse?.detail ||
                    'Something went wrong'
            },
            { status: res.status }
        )
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
