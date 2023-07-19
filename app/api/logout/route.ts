import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const authTokens = cookies().get('authTokens')

    if (authTokens) {
        cookies().delete('authTokens')
        redirect('/logout')
    }

    redirect('/')
}
