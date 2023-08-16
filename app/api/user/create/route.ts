import { apiUrl } from '@/helpers/apiUrl'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/dist/client/components/headers'
import { APIResponse } from '@/types/api-response'
import { LoginRequestData, UserCreateRequestData } from '@/types/api-request'
import { UserTokens } from '@/types/tokens'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const username = body.username
        const email = body.email
        const password = body.password
        const birthdate = body.birthdate

        const userCreateData: UserCreateRequestData = {
            username: username,
            email: email,
            password: password,
            birthdate: birthdate
        }

        const res = await fetch(`${apiUrl}/api/customer/create/`, {
            method: 'post',
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
            const res = await fetch(`${apiUrl}/api/token/`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            })

            if (res.ok) {
                const userTokens: UserTokens = await res.json()

                cookies().set('authTokens', JSON.stringify(userTokens))

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
        console.log(err)

        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        )
    }
}
