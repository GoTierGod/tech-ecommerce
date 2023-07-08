import style from './page.module.css'

import { getData } from '@/helpers/getData'
import { CardProductDetails } from '@/types/products'
import { Brand, Category } from '@/types/tables'
import SearchAndResults from '@/components/SearchAndResults'

export default async function Search({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
    // SEARCHED TEXT
    const { slug: search } = params

    // SEARCH PARAMS
    const {
        min_price,
        max_price,
        is_gamer,
        category,
        brand,
        installments,
        order_by
    } = searchParams ?? {}

    // CONSTRUCT THE QUERY STRING
    const getQueryString = () => {
        const filters = []

        min_price && filters.push(`min_price=${min_price}`)
        max_price && filters.push(`max_price=${max_price}`)
        is_gamer && filters.push(`is_gamer=${is_gamer}`)
        category && filters.push(`category=${category}`)
        brand && filters.push(`brand=${brand}`)
        installments && filters.push(`installments=${installments}`)
        order_by && filters.push(`order_by=${order_by}`)

        return filters.length > 0 ? '?' + filters.join('&') : ''
    }

    // SEARCHED STRING IN A READABLE FORMAT
    const readableSearch = search.replace(/(\s|\%20)+/g, ',')

    // PRODUCTS
    let products: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/search/${
            readableSearch + getQueryString()
        }`
    )

    // CATEGORIES
    const categories: Category[] = await getData(
        `https://ft-drf-api.vercel.app/api/categories`
    )

    // BRANDS
    const brands: Brand[] = await getData(
        `https://ft-drf-api.vercel.app/api/brands`
    )

    return (
        <main>
            <SearchAndResults
                searchText={readableSearch}
                categories={categories}
                brands={brands}
                products={products}
                queryObject={searchParams}
                queryString={getQueryString()}
            />
        </main>
    )
}
