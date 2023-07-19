import { apiUrl } from '@/helpers/apiUrl'
import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

export interface UserTokens {
    refresh: string
    access: string
}

export interface DecodedUserInfo {
    user_id: number
    username: string
    token_type: string
    exp: number
    iat: number
    jti: string
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const res = await fetch(`${apiUrl}/api/token/`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: body.username,
                password: body.password
            })
        })

        if (res.ok) {
            const userTokens: UserTokens = await res.json()

            cookies().set('authTokens', JSON.stringify(userTokens))

            return NextResponse.json(userTokens, { status: 200 })
        }

        return NextResponse.json({}, { status: 401 })
    } catch (err) {
        return NextResponse.json({}, { status: 401 })
    }
}
