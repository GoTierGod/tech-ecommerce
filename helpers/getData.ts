// FETCH WITH ERROR HANDLING FOR API CALLS
export const getData = async (url: string) => {
    const res = await fetch(url)

    if (res.ok) return res.json()
    else if (res.status === 404) return []

    throw new Error('Filed to fetch')
}
