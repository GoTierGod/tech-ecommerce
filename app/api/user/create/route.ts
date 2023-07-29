import { apiUrl } from '@/helpers/apiUrl'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const username = body.username
        const email = body.email
        const password = body.password
        const birthdate = body.birthdate

        const res = await fetch(`${apiUrl}/customer/create/`, {
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
            return NextResponse.json({}, { status: 200 })
        }

        return NextResponse.json({}, { status: 400 })
    } catch (err) {
        return NextResponse.json({}, { status: 400 })
    }
}
