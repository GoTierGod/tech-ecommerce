import { API_URL } from '@/constants/back-end'
import { AuthTokens } from '@/types/tokens'
import { cookies, headers } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const forwardedFor = headers().get('X-Forwarded-For')
    if (!forwardedFor) {
        cookies().delete('authTokens')
        redirect('/')
    }

    const authCookies = cookies().get('authTokens')
    if (authCookies) {
        let authTokens: AuthTokens | null = null
        try {
            authTokens = JSON.parse(authCookies.value) as AuthTokens
        } catch (err) {
            cookies().delete('authTokens')
            redirect('/')
        }

        const { searchParams } = new URL(req.url)
        const auth = searchParams.get('auth')
        const path = searchParams.get('oath')

        if (!auth || !path) {
            cookies().delete('authTokens')
            redirect('/')
        }

        const refreshData: { refresh: string } = {
            refresh: authTokens.refresh
        }

        const res = await fetch(`${API_URL}/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Forwarded-For': forwardedFor
            },
            body: JSON.stringify(refreshData)
        })

        // Successfull log in
        if (res.ok) {
            const authTokens: AuthTokens = await res.json()
            cookies().set('authTokens', JSON.stringify(authTokens))

            redirect(path)
        }
        // Unsuccessfull log in
        else {
            cookies().delete('authTokens')
            // If authentication is required
            if (Boolean(Number(auth))) redirect('/login')
            // If authentication is optional
            else redirect(path)
        }
    } else {
        cookies().delete('authTokens')
        redirect('/')
    }
}
