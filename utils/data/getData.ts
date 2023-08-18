// HELPER FUNCTION TO FETCH DATA IN SERVER SIDE
export const getData = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) return false

    return res.json()
}
