import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/constants/back-end'
import { AuthTokens } from '@/types/tokens'

export async function POST(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for')
    console.log(`ip address: ${ip}`)

    try {
        const body = await req.json()

        const loginData: { username: string; password: string } = {
            username: body.username,
            password: body.password
        }

        const res = await fetch(`${API_URL}/api/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

        const errorResponse: { detail: string } = await res.json()
        return NextResponse.json(
            { message: errorResponse.detail },
            { status: res.status }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
