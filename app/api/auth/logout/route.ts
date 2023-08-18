import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'
import { LogoutRequestData } from '@/types/api-request'
import { AuthTokens } from '@/types/tokens'
import { API_URL } from '@/constants/api'

export async function POST(req: NextRequest) {
    const authCookies = cookies().get('authTokens')
    if (!authCookies) {
        cookies().delete('authTokens')
        return NextResponse.json({}, { status: 401 })
    }

    const authTokens: AuthTokens = JSON.parse(authCookies.value)
    if (!authTokens.refresh) {
        cookies().delete('authTokens')
        return NextResponse.json({}, { status: 401 })
    }

    const logoutData: LogoutRequestData = {
        refresh: authTokens.refresh
    }

    const res = await fetch(`${API_URL}/api/token/blacklist/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(logoutData)
    })

    if (res.ok) {
        cookies().delete('authTokens')
        return NextResponse.json({}, { status: 200 })
    }

    cookies().delete('authTokens')
    return NextResponse.json({}, { status: 401 })
}
