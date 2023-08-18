import { API_URL } from '@/constants/api'

export const getData = async (route: string) => {
    const res = await fetch(`${API_URL + route}`, {
        next: { revalidate: 3600 }
    })

    if (!res.ok) return null

    return res.json()
}
