import { cookies, headers } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

import { API_URL } from '@/constants/back-end'
import { APIResponse } from '@/types/response'
import { AuthTokens } from '@/types/tokens'

export async function POST(req: NextRequest) {
    try {
        const forwardedFor = headers().get('X-Forwarded-For') as string

        const authCookies = cookies().get('authTokens')
        if (authCookies) {
            let authTokens: AuthTokens | null = null
            try {
                authTokens = JSON.parse(authCookies.value) as AuthTokens
            } catch (err) {
                cookies().delete('authTokens')

                return NextResponse.json(
                    { message: 'Invalid authentication credentials' },
                    { status: 401 }
                )
            }

            const body = await req.json()

            const productsList: Array<number> = body.products
            if (productsList.length > 10 || productsList.length < 1)
                return NextResponse.json(
                    { message: 'Invalid number of products' },
                    { status: 400 }
                )

            const products: Array<{ id: number; quantity: number }> = []
            const quantityMap: { [key: string]: number } = {}

            for (const id of productsList) {
                if (quantityMap[id]) {
                    quantityMap[id]++
                } else {
                    quantityMap[id] = 1
                }
            }
            for (const id of Object.keys(quantityMap)) {
                products.push({ id: Number(id), quantity: quantityMap[id] })
            }

            const { payment, country, city, address, notes, coupon } = body

            const purchaseData: {
                products: { id: number; quantity: number }[]
                payment_method: string
                country: string
                city: string
                address: string
                notes: string
                coupon?: number
            } = {
                products: products,
                payment_method: payment,
                country: country,
                city: city,
                address: address,
                notes: notes,
                ...(coupon && { coupon })
            }

            const res = await fetch(`${API_URL}/api/purchase/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`,
                    'X-Forwarded-For': forwardedFor
                },
                body: JSON.stringify(purchaseData)
            })

            if (res.ok) {
                const apiResponse: APIResponse = await res.json()
                return NextResponse.json(apiResponse, { status: 200 })
            }

            const errorResponse: APIResponse = await res.json()
            return NextResponse.json(
                {
                    message:
                        errorResponse?.message ||
                        errorResponse?.detail ||
                        'Something went wrong'
                },
                { status: res.status }
            )
        }

        return NextResponse.json(
            { message: 'Missing authentication credentials' },
            { status: 401 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
