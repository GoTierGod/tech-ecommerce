import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'
import { UserTokens } from '../../login/route'
import { apiUrl } from '@/helpers/apiUrl'

export async function POST(req: NextRequest) {
    const authTokens = cookies().get('authTokens')

    if (authTokens) {
        try {
            const body = await req.json()

            const userTokens: UserTokens = JSON.parse(authTokens.value)

            const username = body.username
            const email = body.email
            const password = body.password
            const phone = body.phone
            const country = body.country
            const city = body.city
            const address = body.address
            const firstname = body.firstname
            const lastname = body.lastname
            const birthdate = body.birthdate
            const gender = body.gender

            const fields: { key: string; value: string | undefined }[] = [
                { key: 'username', value: username },
                { key: 'email', value: email },
                { key: 'password', value: password },
                { key: 'phone', value: phone },
                { key: 'country', value: country },
                { key: 'city', value: city },
                { key: 'address', value: address },
                { key: 'firstname', value: firstname },
                { key: 'lastname', value: lastname },
                { key: 'birthdate', value: birthdate },
                { key: 'gender', value: gender }
            ]

            const updatedFields: { [key: string]: string } = Object.fromEntries(
                fields
                    .filter(entry => entry.value !== undefined)
                    .map(entry => [entry.key, entry.value as string])
            )

            // const res = await fetch(`${apiUrl}/api/edit/`, {
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${userTokens.access}`
            //     },
            //     body: JSON.stringify(updatedFields)
            // })

            return NextResponse.json({}, { status: 200 })
        } catch (err) {
            return NextResponse.json({}, { status: 401 })
        }
    }

    return NextResponse.json({}, { status: 401 })
}
