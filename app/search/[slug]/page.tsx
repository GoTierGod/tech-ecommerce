import { unescape } from 'querystring'
import { Metadata } from 'next'

import { SearchResponse } from '@/types/search'
import Search from '../_components/Search'
import { capitalizeFormatter } from '@/utils/formatting/capitalizeFormatter'
import { getCustomer } from '@/utils/data/getCustomer'
import { headers } from 'next/dist/client/components/headers'
import { API_URL } from '@/constants/back-end'

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
    const forwardedFor = headers().get('X-Forwarded-For') as string

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
    metadata.title = `${capitalizeFormatter(unescapedSearchStr)} | Tech`

    const searchRes: SearchResponse =
        await (async (): Promise<SearchResponse> => {
            const res = await fetch(
                `${API_URL}/api/search/${
                    unescapedSearchStr.replace(/\s+/, ',') +
                    composeQueryParams()
                }`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Forwarded-For': forwardedFor
                    }
                }
            )

            if (res.ok) {
                return await res.json()
            }

            return {
                results: 0,
                pages: 1,
                products: [],
                categories: [],
                brands: [],
                installments: []
            } as SearchResponse
        })()

    const customer = getCustomer()

    return (
        <Search
            searchStr={unescapedSearchStr}
            searchParams={searchParams}
            searchRes={searchRes}
        />
    )
}
