import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'
import { DecodedUserInfo, UserTokens } from '../login/route'
import jwtDecode from 'jwt-decode'
import { apiUrl } from '@/helpers/apiUrl'

export async function POST(req: NextRequest) {
    // USER AUTH TOKENS STORED AS COOKIES
    const authTokens = cookies().get('authTokens')

    if (authTokens) {
        const userTokens: UserTokens = JSON.parse(authTokens.value)
        const decodedUser: DecodedUserInfo = jwtDecode(userTokens.access)

        // ACCESS EXPIRATION TIME AND CURRENT TIME
        const tokenExpTime = decodedUser.exp
        const currentTime = Math.floor(Date.now() / 1000)

        // REFRESH TOKENS IF THE ACCESS TOKEN EXPIRES
        if (currentTime + 4 * 60 >= tokenExpTime) {
            // POST REQUEST TO REFRESH TOKENS
            const res = await fetch(`${apiUrl}/api/token/refresh/`, {
                method: 'post',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: userTokens.refresh })
            })

            // IF THE REFRESH TOKEN WAS VALID, SET THE NEW AUTH TOKENS COOKIE
            // OTHERWISE  RETURN NULL
            if (res.ok) {
                const data = await res.json()
                cookies().set('authTokens', JSON.stringify(data))
                return NextResponse.json({}, { status: 200 })
            } else {
                cookies().delete('authTokens')
                return NextResponse.json({}, { status: 401 })
            }
        }
    }

    console.log('NO COOKIES')
    return NextResponse.json({}, { status: 401 })
}
