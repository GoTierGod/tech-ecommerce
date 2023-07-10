import { notFound } from 'next/navigation'

// FETCH WITH ERROR HANDLING FOR API CALLS
export const getData = async (url: string) => {
    const res = await fetch(url, { next: { revalidate: 60 } })

    if (!res.ok) return false

    return res.json()
}
