import { ReactElement } from 'react'

export const respectLineBreaks = (str: string): ReactElement => {
    const splittedStr = str.split('<br />')
    const result: Array<string | ReactElement> = []

    splittedStr.forEach((s, idx) => {
        if (idx !== splittedStr.length) {
            result.push(s)
            result.push(<br />)
        } else result.push(s)
    })

    return <>{result}</>
}
