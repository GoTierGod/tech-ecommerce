import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'
import { apiUrl } from '@/helpers/apiUrl'
import { LogoutRequestData } from '@/types/api-request'
import { UserTokens } from '@/types/tokens'

export async function POST(req: NextRequest) {
    const authTokens = cookies().get('authTokens')
    if (!authTokens) {
        cookies().delete('authTokens')
        return NextResponse.json({}, { status: 401 })
    }

    const userTokens: UserTokens = JSON.parse(authTokens.value)
    if (!userTokens.refresh) {
        cookies().delete('authTokens')
        return NextResponse.json({}, { status: 401 })
    }

    const refreshToken: LogoutRequestData = {
        refresh: userTokens.refresh
    }

    const res = await fetch(`${apiUrl}/api/token/blacklist/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(refreshToken)
    })

    if (res.ok) {
        cookies().delete('authTokens')
        return NextResponse.json({}, { status: 200 })
    }

    cookies().delete('authTokens')
    return NextResponse.json({}, { status: 401 })
}
