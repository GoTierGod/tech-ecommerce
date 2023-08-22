import { API_URL } from '@/constants/api'
import { APIResponse } from '@/types/api-response'
import { AuthTokens } from '@/types/tokens'
import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
    try {
        const authCookies = cookies().get('authTokens')

        if (authCookies) {
            let authTokens: AuthTokens | null = null
            try {
                authTokens = JSON.parse(authCookies.value) as AuthTokens
            } catch (err) {
                cookies().delete('authTokens')

                return NextResponse.json(
                    { message: 'Invalid tokens' },
                    { status: 401 }
                )
            }

            const { searchParams } = new URL(req.url)
            let ids: Array<number> | null = null

            try {
                ids = (searchParams.get('ids') as string)
                    .split(',')
                    .map(id => Number(id))
            } catch (err) {
                return NextResponse.json(
                    { message: 'Missing "id" or "ids" parameters' },
                    { status: 400 }
                )
            }

            if (!ids || ids.length === 0) {
                return NextResponse.json(
                    { message: 'Missing "id" or "ids" parameters' },
                    { status: 400 }
                )
            }

            const res = await fetch(`${API_URL}/api/favorites/delete/${ids}`, {
                method: 'DELETE',
                headers: { authorization: `Bearer ${authTokens.access}` }
            })

            if (res.ok) {
                const apiResponse: APIResponse = await res.json()
                return NextResponse.json(apiResponse, { status: 200 })
            }

            const errorResponse: APIResponse = await res.json()
            return NextResponse.json(errorResponse, { status: res.status })
        }
    } catch (err) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
