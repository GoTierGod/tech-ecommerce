import { cookies } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POSTs(req: NextRequest) {
    const authTokens = cookies().get('authTokens')

    if (authTokens) {
        cookies().delete('authTokens')
        return NextResponse.json({}, { status: 200 })
    }

    return NextResponse.json({}, { status: 401 })
}
