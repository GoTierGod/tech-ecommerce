import style from './page.module.css'

import { getData } from '@/utils/data/getData'
import SearchAndResults from '@/components/SearchAndResults'
import { notFound } from 'next/navigation'
import { SearchResponse } from '@/types/search'
import { unescape } from 'querystring'
import { getUser } from '@/utils/data/getUser'
import { CustomerData } from '@/types/users'
import { titleCaseFormatter } from '@/utils/formatting/titleCaseFormatter'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Search | Tech'
}

export default async function Search({
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

    const getQueryString = () => {
        const filters = []

        min_price && filters.push(`min_price=${min_price}`)
        max_price && filters.push(`max_price=${max_price}`)
        is_gamer && filters.push(`is_gamer=${is_gamer}`)
        category && filters.push(`category=${category}`)
        brand && filters.push(`brand=${brand}`)
        installments && filters.push(`installments=${installments}`)
        order_by && filters.push(`order_by=${order_by}`)
        page ? filters.push(`page=${page}`) : filters.push(`page=1`)

        return filters.length > 0 ? '?' + filters.join('&') : ''
    }

    const readableSearch = unescape(search)
    metadata.title = `${titleCaseFormatter(readableSearch)} | Tech`

    const searchRes: SearchResponse | false = await getData(
        `https://ft-drf-api.vercel.app/api/search/${
            readableSearch.replace(/\s+/, ',') + getQueryString()
        }`
    )

    if (!searchRes) return notFound()

    const { results, pages, products, categories, brands } =
        searchRes as SearchResponse

    const user: CustomerData = await getUser()

    return (
        <main>
            <SearchAndResults
                searchText={readableSearch}
                queryObject={searchParams}
                queryString={getQueryString()}
                results={results}
                pages={pages}
                products={products}
                categories={categories}
                brands={brands}
                user={user}
            />
        </main>
    )
}
