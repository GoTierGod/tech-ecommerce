import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from './constants/back-end'
import { AuthTokens } from './types/tokens'
import { Customer } from './types/users'

export async function middleware(req: NextRequest) {
    const headers = new Headers(req.headers)

    // Get the customer data or try to refresh tokens and get the customer data again
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
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authTokens.access}`
            }
        })

        if (customerRes.ok) {
            const data = (await customerRes.json()) as Customer
            headers.set('customer', JSON.stringify(data))
        } else {
            const refreshRes = await fetch(`${API_URL}/api/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: authTokens.refresh })
            })

            if (refreshRes.ok) {
                const data = (await refreshRes.json()) as AuthTokens
                req.cookies.set('authTokens', JSON.stringify(data))

                const customerRes = await fetch(`${API_URL}/api/customer/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authTokens.access}`
                    }
                })

                if (customerRes.ok) {
                    const data = (await customerRes.json()) as Customer
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
}

export const config = {
    matcher: '/:path*'
}
