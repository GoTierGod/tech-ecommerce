import style from './page.module.css'

import { getData } from '@/helpers/getData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch,
    faSortAmountDesc,
    faTasks
} from '@fortawesome/free-solid-svg-icons'
import { CardProductDetails } from '@/types/products'
import VerticalCard from '@/components/VerticalCard'
import FilterForm from '@/components/FilterForm'
import { Brand, Category } from '@/types/tables'

export default async function Search({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
    const { slug: search } = params
    const { minPrice } = searchParams ?? {}
    const { maxPrice } = searchParams ?? {}
    const { isGamer } = searchParams ?? {}
    const { category } = searchParams ?? {}
    const { brand } = searchParams ?? {}
    const { installments } = searchParams ?? {}

    const getQueryParams = () => {
        const filters = []

        minPrice && filters.push(`min_price=${minPrice}`)
        maxPrice && filters.push(`max_price=${maxPrice}`)
        isGamer && filters.push(`is_gamer=${isGamer}`)
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
            <div className={style.wrapper}>
                <div className={style.header}>
                    <div className={style.mobile}>
                        <div>
                            <button>
                                <FontAwesomeIcon icon={faSortAmountDesc} /> Sort
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faTasks} /> Filter
                            </button>
                        </div>
                        <h2>{search.replace(/(\s|\%20)+/g, ' ')}</h2>
                    </div>
                    <div className={style.desktop}>
                        <div>
                            <h2>
                                Searched Text{' '}
                                <FontAwesomeIcon icon={faSearch} />
                            </h2>
                            <p>{search.replace(/(\s|\%20)+/g, ' ')}</p>
                        </div>
                        <div>
                            <h2>
                                Filters <FontAwesomeIcon icon={faTasks} />
                            </h2>
                            <FilterForm
                                search={cleanedSearch}
                                categories={categories}
                                brands={brands}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.results}>
                    <div>
                        <span>1.476 Results</span>
                        <button>
                            <FontAwesomeIcon icon={faSortAmountDesc} /> Sort
                        </button>
                    </div>
                    <div className={style.grid}>
                        {products.map(product => (
                            <VerticalCard
                                key={product.details.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
