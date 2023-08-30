import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { API_URL } from '@/constants/back-end'
import { AuthTokens } from '@/types/tokens'

export async function GET(req: NextRequest) {
    // Get search params
    const { searchParams } = new URL(req.url)
    const path = searchParams.get('path')
    const auth = searchParams.get('auth')

    // Check for auth cookies
    const authCookies = cookies().get('authTokens')
    if (!authCookies) redirect('/')

    // Check for path
    if (!path) {
        cookies().delete('authTokens')
        redirect('/')
    }

    // Check if auth cookies is valid JSON
    let authTokens: AuthTokens | null = null
    try {
        authTokens = JSON.parse(authCookies.value)
    } catch (err) {
        cookies().delete('authTokens')
    }
    // Check if there's a refresh token in cookies
    if (!authTokens?.refresh) redirect('/')

    // Try to refresh the user auth tokens
    const refreshData: { refresh: string } = {
        refresh: authTokens.refresh
    }

    const res = await fetch(`${API_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(refreshData)
    })

    // If authentication matters
    if (auth) {
        // If the auth parameter is not 0 or 1, delete the cookies and redirect
        if (!['0', '1'].includes(auth)) {
            cookies().delete('authTokens')
            redirect('/')
        }

        // If the request was sucessfull, set the new auth tokens and
        //     if the route needs authentication, redirect to the route which call this route handler
        //     otherwise redirect tothe home page
        if (res.ok) {
            const data = await res.json()
            cookies().set('authTokens', JSON.stringify(data))

            if (Boolean(Number(auth))) redirect(`${path}`)
            else redirect('/')
        }
        // Otherwise delete invalid cookies and
        //     if this route needs authentication, redirect to /login
        //     otherwise redirect to the route which call this route handler
        else {
            cookies().delete('authTokens')

            if (Boolean(Number(auth))) redirect(`/login`)
            else redirect(`${path}`)
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
        redirect(`${path}`)
    }
}
