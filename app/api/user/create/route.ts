import { apiUrl } from '@/helpers/apiUrl'
import { NextRequest, NextResponse } from 'next/server'
import { UserTokens } from '../../auth/login/route'
import { cookies } from 'next/dist/client/components/headers'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const username = body.username
        const email = body.email
        const password = body.password
        const birthdate = body.birthdate

        const res = await fetch(`${apiUrl}/api/customer/create/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                birthdate: birthdate
            })
        })

        if (res.ok) {
            const res = await fetch(`${apiUrl}/api/token/`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })

            if (res.ok) {
                const userTokens: UserTokens = await res.json()

                cookies().set('authTokens', JSON.stringify(userTokens))

                return NextResponse.json({}, { status: 200 })
            }

            return NextResponse.json({}, { status: 201 })
        }

        return NextResponse.json({}, { status: 400 })
    } catch (err) {
        return NextResponse.json({}, { status: 400 })
    }
}
