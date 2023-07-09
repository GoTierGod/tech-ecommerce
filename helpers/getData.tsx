import { notFound } from 'next/navigation'

// FETCH WITH ERROR HANDLING FOR API CALLS
export const getData = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) return notFound()

    return res.json()
}
