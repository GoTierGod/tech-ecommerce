// FETCH WITH ERROR HANDLING FOR API CALLS
export const getData = async (url: string) => {
    const res = await fetch(url)

    return res.json()
}
