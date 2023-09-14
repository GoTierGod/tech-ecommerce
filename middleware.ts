import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from './constants/back-end'
import { AuthTokens } from './types/tokens'
import { ComposedCustomerData } from './types/customer'

export async function middleware(req: NextRequest) {
    try {
        const forwardedFor = req.headers.get('X-Forwarded-For') as string

        const headers = new Headers(req.headers)
        const authCookies = req.cookies.get('authTokens')
        if (!authCookies) req.cookies.delete('authTokens')
        else {
            let authTokens: AuthTokens | null = null
            try {
                authTokens = JSON.parse(authCookies.value) as AuthTokens
            } catch (err) {
                req.cookies.delete('authTokens')
                return NextResponse.next({
                    request: {
                        headers
                    }
                })
            }

            const customerRes = await fetch(`${API_URL}/api/customer/`, {
                next: { revalidate: 60 },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`,
                    'X-Forwarded-For': forwardedFor
                }
            })

            if (customerRes.ok) {
                const data = (await customerRes.json()) as ComposedCustomerData
                headers.set('customer', JSON.stringify(data))
            } else {
                const refreshRes = await fetch(
                    `${API_URL}/api/token/refresh/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Forwarded-For': forwardedFor
                        },
                        body: JSON.stringify({ refresh: authTokens.refresh })
                    }
                )

                if (refreshRes.ok) {
                    const data = (await refreshRes.json()) as AuthTokens
                    req.cookies.set('authTokens', JSON.stringify(data))

                    const customerRes = await fetch(
                        `${API_URL}/api/customer/`,
                        {
                            next: { revalidate: 60 },
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${data.access}`,
                                'X-Forwarded-For': forwardedFor
                            }
                        }
                    )

                    if (customerRes.ok) {
                        const data =
                            (await customerRes.json()) as ComposedCustomerData
                        headers.set('customer', JSON.stringify(data))
                    } else req.cookies.delete('authTokens')
                }
            }
        }

        return NextResponse.next({
            request: {
                headers
            }
        })
    } catch (err) {
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|next.svg|vercel.svg|ogp.png).*)'
    ]
}
