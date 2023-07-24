// HELPER FUNCTION TO FETCH DATA IN SERVER SIDE
export const getData = async (url: string) => {
    const res = await fetch(url, { next: { revalidate: 60 } })

    if (!res.ok) return false

    return res.json()
}
