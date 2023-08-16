import { apiUrl } from '@/helpers/apiUrl'
import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { RefreshRequestData } from '@/types/api-request'
import { UserTokens } from '@/types/tokens'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const path = searchParams.get('path')
    const auth = searchParams.get('auth')
    if (!path) redirect('/')

    const authTokens = cookies().get('authTokens')
    if (!authTokens) redirect('/')

    const userTokens: UserTokens = JSON.parse(authTokens.value)
    if (!userTokens.refresh) redirect('/')

    const refreshToken: RefreshRequestData = {
        refresh: userTokens.refresh
    }

    const res = await fetch(`${apiUrl}/api/token/refresh/`, {
        method: 'post',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(refreshToken)
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
