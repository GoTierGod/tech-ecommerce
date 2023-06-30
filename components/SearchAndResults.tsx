'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../styles/searchAndResults.module.css'

import { Brand, Category } from '@/types/tables'
import {
    faSearch,
    faSortAmountDesc,
    faTasks
} from '@fortawesome/free-solid-svg-icons'
import FilterForm from './FilterForm'
import { CardProductDetails } from '@/types/products'
import SearchCard from './SearchCard'
import {
    MutableRefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

interface SearchProps {
    search: string
    categories: Category[]
    brands: Brand[]
    products: CardProductDetails[]
    query: string
}

const SearchAndResults = ({
    search,
    categories,
    brands,
    products,
    query
}: SearchProps) => {
    const router = useRouter()

    // Sorting value, could be "offer_price", "offer_price-" or ""
    const [orderBy, setOrderBy] = useState('')

    // Modals references
    const filteringModalRef: MutableRefObject<null | HTMLDialogElement> =
        useRef(null)
    const sortingModalRef: MutableRefObject<null | HTMLDialogElement> =
        useRef(null)

    // Open/close the filtering modal
    const filteringModal = (bool: boolean) => {
        if (filteringModalRef.current) {
            bool
                ? filteringModalRef.current.showModal()
                : filteringModalRef.current.close()
        }
    }

    // Open/close the sorting modal
    const sortingModal = (bool: boolean) => {
        if (sortingModalRef.current) {
            bool
                ? sortingModalRef.current.showModal()
                : sortingModalRef.current.close()
        }
    }

    // Constructur a query string that also supports sorting
    const sortQuery = (queryParams: string, orBy: string) => {
        if (orBy) {
            const unsortedQuery = queryParams
                .replace(/order_by=[^&]*/, '')
                .replace('?', '')

            return unsortedQuery.length > 0
                ? '?' + unsortedQuery + `&order_by=${orBy}`
                : `?order_by=${orBy}`
        }

        return queryParams.length > 0 ? '?' + queryParams.replace('?', '') : ''
    }

    // Close the modal after making a request
    useEffect(() => {
        filteringModal(false)
        sortingModal(false)
    }, [query])

    // Sort products when "orderBy" is set
    useEffect(() => {
        router.push(`/search/${search + sortQuery(query, orderBy)}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderBy])

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.mobile}>
                    <div>
                        <button onClick={() => sortingModal(true)}>
                            <FontAwesomeIcon icon={faSortAmountDesc} /> Sort
                        </button>
                        <button onClick={() => filteringModal(true)}>
                            <FontAwesomeIcon icon={faTasks} /> Filter
                        </button>
                    </div>
                    <h2>{search.replace(/(\s|\%20)+/g, ' ')}</h2>
                </div>
                <div className={style.desktop}>
                    <div>
                        <h2>
                            Searched Text <FontAwesomeIcon icon={faSearch} />
                        </h2>
                        <p>{search.replace(/(\s|\%20)+/g, ' ')}</p>
                    </div>
                    <div>
                        <h2>
                            Filters <FontAwesomeIcon icon={faTasks} />
                        </h2>
                        <FilterForm
                            search={search}
                            categories={categories}
                            brands={brands}
                            sortQuery={sortQuery}
                            orderBy={orderBy}
                        />
                    </div>
                </div>
            </div>
            <div className={style.results}>
                <div>
                    <div className={style.desktopOrderBy}>
                        <label htmlFor='order-by'>Order By</label>
                        <select
                            onChange={e => setOrderBy(e.target.value)}
                            name='order-by'
                            id='order-by'
                        >
                            <option value=''>Any</option>
                            <option value='offer_price'>Lower Price</option>
                            <option value='-offer_price'>Higher Price</option>
                        </select>
                    </div>
                </div>
                <div className={style.grid}>
                    {products.map(product => (
                        <SearchCard
                            key={product.details.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
            <dialog ref={filteringModalRef} className={style.modal}>
                <div>
                    <FilterForm
                        search={search}
                        categories={categories}
                        brands={brands}
                        sortQuery={sortQuery}
                        orderBy={orderBy}
                    />
                    <button onClick={() => filteringModal(false)}>Close</button>
                </div>
            </dialog>
            <dialog ref={sortingModalRef} className={style.modal}>
                <div>
                    <div className={style.orderBy}>
                        <h2>Order By</h2>
                        <div>
                            <button onClick={() => setOrderBy('offer_price')}>
                                Lower Price
                            </button>
                            <button onClick={() => setOrderBy('-offer_price')}>
                                Higher Price
                            </button>
                            <button onClick={() => setOrderBy('')}>Any</button>
                        </div>
                    </div>
                    <button onClick={() => sortingModal(false)}>Close</button>
                </div>
            </dialog>
        </div>
    )
}

export default SearchAndResults
