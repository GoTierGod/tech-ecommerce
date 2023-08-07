import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { UserTokens } from '../login/route'
import { apiUrl } from '@/helpers/apiUrl'

export async function POST(req: NextRequest) {
    // USER AUTH TOKENS STORED AS COOKIES
    const authTokens = cookies().get('authTokens')
    if (!authTokens) {
        cookies().delete('authTokens')
        return NextResponse.json({}, { status: 401 })
    }

    // CHECK FOR A VALID REFRESH TOKEN
    const userTokens: UserTokens = JSON.parse(authTokens.value)
    if (!userTokens.refresh) {
        cookies().delete('authTokens')
        return NextResponse.json({}, { status: 401 })
    }

    // BLACKLIST THE REFRESH TOKEN
    const res = await fetch(`${apiUrl}/api/token/blacklist/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: userTokens.refresh })
    })

    // DELETE AUTH COOKIES FROM THE USER BROWSER
    if (res.ok) {
        cookies().delete('authTokens')
        return NextResponse.json({}, { status: 200 })
    }

    cookies().delete('authTokens')
    return NextResponse.json({}, { status: 401 })
}
