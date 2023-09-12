import { unescape } from 'querystring'
import { Metadata } from 'next'

import { SearchResponse } from '@/types/search'
import Search from '../_components/Search'
import { getData } from '@/utils/data/getData'
import { titleCaseFormatter } from '@/utils/formatting/titleCaseFormatter'
import { getCustomer } from '@/utils/data/getCustomer'

export const metadata: Metadata = {
    title: 'Search | Tech'
}

export default async function Page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
    const { slug: search } = params

    const {
        min_price,
        max_price,
        is_gamer,
        category,
        brand,
        installments,
        order_by,
        page
    } = searchParams ?? {}

    const composeQueryParams = () => {
        const filters = []

        min_price && filters.push(`min_price=${min_price}`)
        max_price && filters.push(`max_price=${max_price}`)
        is_gamer && filters.push(`is_gamer=${is_gamer}`)
        category && filters.push(`category=${category}`)
        brand && filters.push(`brand=${brand}`)
        installments && filters.push(`installments=${installments}`)
        order_by && filters.push(`order_by=${order_by}`)
        page && filters.push(`page=${page}`)

        return filters.length > 0 ? '?' + filters.join('&') : ''
    }

    const unescapedSearchStr = unescape(search)
    metadata.title = `${titleCaseFormatter(unescapedSearchStr)} | Tech`

    const searchRes: SearchResponse = await getData(
        `/api/search/${
            unescapedSearchStr.replace(/\s+/, ',') + composeQueryParams()
        }`
    )

    const customer = await getCustomer()

    return (
        <Search
            searchStr={unescapedSearchStr}
            searchParams={searchParams}
            searchRes={searchRes}
        />
    )
}
