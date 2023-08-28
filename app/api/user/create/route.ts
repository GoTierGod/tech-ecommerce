import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/dist/client/components/headers'
import { APIResponse } from '@/types/api-response'
import { LoginRequestData, UserCreateRequestData } from '@/types/api-request'
import { AuthTokens } from '@/types/tokens'
import { API_URL } from '@/constants/api'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const userCreateData: UserCreateRequestData = {
            username: body.username,
            email: body.email,
            password: body.password,
            birthdate: body.birthdate
        }

        const res = await fetch(`${API_URL}/api/customer/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCreateData)
        })

        const loginData: LoginRequestData = {
            username: body.username,
            password: body.password
        }

        if (res.status === 201) {
            const res = await fetch(`${API_URL}/api/token/`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            })

            if (res.ok) {
                const authTokens: AuthTokens = await res.json()

                cookies().set('authTokens', JSON.stringify(authTokens))

                return NextResponse.json(
                    { message: 'Registered and logged in' },
                    { status: 200 }
                )
            }

            return NextResponse.json(
                { message: 'Successfully registered' },
                { status: 201 }
            )
        }

        const errorResponse: APIResponse = await res.json()
        return NextResponse.json(errorResponse, { status: res.status })
    } catch (err) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
