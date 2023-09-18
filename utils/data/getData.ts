import { API_URL } from '@/constants/back-end'
import { APIResponse } from '@/types/response'
import { headers } from 'next/dist/client/components/headers'

export const getData = async (route: string) => {
    try {
        const forwardedFor = headers().get('X-Forwarded-For') as string

        const res = await fetch(`${API_URL + route}`, {
            next: { revalidate: 3600 },
            headers: {
                'Content-Type': 'application/json',
                ...(forwardedFor && { 'X-Forwarded-For': forwardedFor })
            }
        })

        if (res.ok) return await res.json()

        return []
    } catch (err) {
        return []
    }
}
