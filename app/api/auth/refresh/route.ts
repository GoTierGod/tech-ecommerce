import { apiUrl } from '@/helpers/apiUrl'
import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { UserTokens } from '../login/route'

export async function GET(req: NextRequest) {
    // PATH TO REDIRECT
    const { searchParams } = new URL(req.url)
    const path = searchParams.get('path')
    const auth = searchParams.get('auth')
    if (!path) redirect('/')

    // USER AUTH TOKENS STORED AS COOKIES
    const authTokens = cookies().get('authTokens')
    if (!authTokens) redirect('/')

    // CHECK FOR A VALID REFRESH TOKEN
    const userTokens: UserTokens = JSON.parse(authTokens.value)
    if (!userTokens.refresh) redirect('/')

    // POST REQUEST TO REFRESH TOKENS
    const res = await fetch(`${apiUrl}/api/token/refresh/`, {
        method: 'post',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: userTokens.refresh })
    })

    // IF AUTHENTICATION MATTERS
    if (auth) {
        // CHECK FOR AN INVALID AUTH PARAMETER
        if (!['0', '1'].includes(auth)) redirect('/')

        // IF THE REFRESH TOKEN WAS VALID, SET THE NEW AUTH TOKENS COOKIE AND REDIRECT
        if (res.ok) {
            const data = await res.json()
            cookies().set('authTokens', JSON.stringify(data))
            if (Boolean(Number(auth))) redirect(`${path}`)
            else redirect('/')
        }
        // OTHERWISE  DELETE AUTH TOKENS COOKIE AND REDIRECT
        else {
            cookies().delete('authTokens')
            if (Boolean(Number(auth))) redirect(`/login`)
            else redirect(`${path}`)
        }
    }

    // IF AUTHENTICATION DOESN'T MATTER
    else {
        if (res.ok) {
            const data = await res.json()
            cookies().set('authTokens', JSON.stringify(data))
        } else cookies().delete('authTokens')

        redirect(`${path}`)
    }
}
