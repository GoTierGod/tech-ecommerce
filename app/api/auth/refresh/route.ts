import { apiUrl } from '@/utils/apiUrl'
import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { RefreshRequestData } from '@/types/api-request'
import { AuthTokens } from '@/types/tokens'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const path = searchParams.get('path')
    const auth = searchParams.get('auth')
    if (!path) redirect('/')

    const authCookies = cookies().get('authTokens')
    if (!authCookies) redirect('/')

    const authTokens: AuthTokens = JSON.parse(authCookies.value)
    if (!authTokens.refresh) redirect('/')

    const refreshData: RefreshRequestData = {
        refresh: authTokens.refresh
    }

    const res = await fetch(`${apiUrl}/api/token/refresh/`, {
        method: 'post',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(refreshData)
    })

    if (auth) {
        if (!['0', '1'].includes(auth)) redirect('/')

        if (res.ok) {
            const data = await res.json()
            cookies().set('authTokens', JSON.stringify(data))

            if (Boolean(Number(auth))) redirect(`${path}`)
            else redirect('/')
        } else {
            cookies().delete('authTokens')

            if (Boolean(Number(auth))) redirect(`/login`)
            else redirect(`${path}`)
        }
    } else {
        if (res.ok) {
            const data = await res.json()
            cookies().set('authTokens', JSON.stringify(data))
        } else cookies().delete('authTokens')

        redirect(`${path}`)
    }
}
