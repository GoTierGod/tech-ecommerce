import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { API_URL } from '@/constants/back-end'
import { AuthTokens } from '@/types/tokens'

const validateAuthStr = (str: string): boolean => ['0', '1'].includes(str)
const strToBoolean = (str: string): boolean => Boolean(Number(str))

export async function GET(req: NextRequest) {
    // path = path to be redirected to
    // auth = string '1' or '0' indicating if authentication is required or not
    const { searchParams } = new URL(req.url)
    const path = searchParams.get('path')
    const auth = searchParams.get('auth')

    // Check for path
    if (!path) {
        cookies().delete('authTokens')
        redirect('/')
    }

    // Check for auth cookies
    const authCookies = cookies().get('authTokens')
    if (!authCookies) {
        if (!auth || !validateAuthStr(auth)) redirect(path)

        redirect(strToBoolean(auth) ? '/' : path)
    }

    // Check if auth cookies are valid JSON
    let authTokens: AuthTokens | null = null
    try {
        authTokens = JSON.parse(authCookies.value) as AuthTokens
    } catch (err) {
        cookies().delete('authTokens')

        if (!auth || !validateAuthStr(auth)) redirect(path)
        redirect(strToBoolean(auth) ? '/' : path)
    }

    // Try to refresh the user auth tokens
    const res = await fetch(`${API_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: authTokens.refresh })
    })

    // If authentication matters
    if (auth) {
        if (!validateAuthStr(auth)) {
            cookies().delete('authTokens')
            redirect('/')
        }

        // If the request was sucessfull, set the new auth tokens and
        //     if the route needs authentication, redirect to the route which call this route handler
        //     otherwise redirect tothe home page
        if (res.ok) {
            const data = await res.json()
            cookies().set('authTokens', JSON.stringify(data))

            redirect(strToBoolean(auth) ? path : '/')
        }

        // Otherwise delete invalid cookies and
        //     if this route needs authentication, redirect to /login
        //     otherwise redirect to the route which call this route handler
        else {
            cookies().delete('authTokens')

            redirect(strToBoolean(auth) ? '/login' : path)
        }
    }

    // If authentication does not matter
    else {
        // If the request was successfull, set the new auth tokens
        if (res.ok) {
            const data = await res.json()
            cookies().set('authTokens', JSON.stringify(data))
        }
        // Otherwise delete the invalid auth tokens
        else cookies().delete('authTokens')

        // Finally as authentication does not matter
        //     redirect to the route which call this route handler
        redirect(path)
    }
}
