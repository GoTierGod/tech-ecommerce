import { apiUrl } from '@/helpers/apiUrl'
import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { DecodedUserInfo, UserTokens } from '../login/route'
import jwtDecode from 'jwt-decode'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const path = searchParams.get('path')
        if (!path)
            return NextResponse.json(
                { message: 'Provide a valid path' },
                { status: 400 }
            )

        // USER AUTH TOKENS STORED AS COOKIES
        const authTokens = cookies().get('authTokens')
        if (!authTokens)
            return NextResponse.json({ message: 'No cookies' }, { status: 401 })

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
                    redirect(`/${path}`)
                    return NextResponse.json(
                        { message: 'Refreshed tokens' },
                        { status: 200 }
                    )
                } else {
                    cookies().delete('authTokens')
                    redirect(`/login`)
                    return NextResponse.json(
                        { message: 'Invalid cookies' },
                        { status: 401 }
                    )
                }
            }
        }
    } catch (err) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
