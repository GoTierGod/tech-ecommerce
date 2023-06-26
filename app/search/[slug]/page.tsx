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
    const { slug: search } = params
    const { min_price, max_price, is_gamer, category, brand, installments } =
        searchParams ?? {}

    const getQueryParams = () => {
        const filters = []

        min_price && filters.push(`min_price=${min_price}`)
        max_price && filters.push(`max_price=${max_price}`)
        is_gamer && filters.push(`is_gamer=${is_gamer}`)
        category && filters.push(`category=${category}`)
        brand && filters.push(`brand=${brand}`)
        installments && filters.push(`installments=${installments}`)

        return filters.length > 0 ? '?' + filters.join('&') : ''
    }

    const cleanedSearch = search.replace(/(\s|\%20)+/g, ',')

    let products: CardProductDetails[] = await getData(
        `https://ft-drf-api.vercel.app/api/search/${
            cleanedSearch + getQueryParams()
        }`
    )

    const categories: Category[] = await getData(
        `https://ft-drf-api.vercel.app/api/categories`
    )

    const brands: Brand[] = await getData(
        `https://ft-drf-api.vercel.app/api/brands`
    )

    return (
        <main>
            <SearchAndResults
                search={cleanedSearch}
                categories={categories}
                brands={brands}
                products={products}
                query={getQueryParams()}
            />
        </main>
    )
}
