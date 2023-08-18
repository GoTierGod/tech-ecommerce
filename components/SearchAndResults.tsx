'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../styles/search-and-results.module.css'

import { Brand, Category } from '@/types/tables'
import {
    faSearch,
    faSortAmountAsc,
    faSortAmountDesc,
    faTasks
} from '@fortawesome/free-solid-svg-icons'
import FilterForm from './FilterForm'
import { ComposedProductInfo } from '@/types/product'
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
import { formatTitleCase } from '@/helpers/formatTitleCase'
import { CustomerData } from '@/types/users'

interface SearchProps {
    searchText: string
    queryObject?: { [key: string]: string | string[] | undefined }
    queryString: string
    results: number
    pages: number
    products: ComposedProductInfo[]
    categories: Category[]
    brands: Brand[]
    user: CustomerData
}

const SearchAndResults = ({
    searchText,
    queryObject,
    queryString,
    results,
    pages,
    products,
    categories,
    brands,
    user
}: SearchProps) => {
    const router = useRouter()

    const { order_by, page } = queryObject ?? {}

    const [orderBy, setOrderBy] = useState((order_by as string) || '')
    const [currentPage, setCurrentPage] = useState((page as string) || '1')

    const filteringModalRef: MutableRefObject<null | HTMLDialogElement> =
        useRef(null)
    const sortingModalRef: MutableRefObject<null | HTMLDialogElement> =
        useRef(null)

    const filteringModal = (bool: boolean) => {
        if (filteringModalRef.current) {
            if (bool) {
                filteringModalRef.current.showModal()
                filteringModalRef.current.focus()
            } else {
                filteringModalRef.current.close()
            }
        }
    }

    const sortingModal = (bool: boolean) => {
        if (sortingModalRef.current) {
            if (bool) {
                sortingModalRef.current.showModal()
                sortingModalRef.current.focus()
            } else {
                sortingModalRef.current.close()
            }
        }
    }

    // CONSTRUCT A QUERY STRING THAT ALSO SUPPORTS SORTING
    const sortQuery = useMemo(() => {
        if (orderBy) {
            const unsortedQuery = queryString
                .replace(/order_by=[^&]*/, '')
                .replace('?', '')

            return unsortedQuery.length > 0
                ? '?' + unsortedQuery + `&order_by=${orderBy}`
                : `?order_by=${orderBy}`
        }

        return queryString.length > 0
            ? '?' +
                  queryString
                      .replace('?', '')
                      .replace(/order_by=(offer_price|-offer_price)/, '')
            : ''
    }, [queryString, orderBy])

    const changeSorting = (val: string) => {
        if (orderBy === val) setOrderBy('')
        else setOrderBy(val)

        sortingModal(false)
    }

    const changePage = useCallback(
        (toPage: string) => {
            if (toPage === 'next' && Number(currentPage) < pages) {
                setCurrentPage(prevPage => (Number(prevPage) + 1).toString())
            } else if (toPage === 'prev' && Number(currentPage) > 0) {
                setCurrentPage(prevPage => (Number(prevPage) - 1).toString())
            }
        },
        [currentPage, pages]
    )

    useEffect(() => {
        filteringModal(false)
        sortingModal(false)
    }, [queryString])

    useEffect(() => {
        router.push(`/search/${searchText + sortQuery}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderBy])

    // PAGE CHANGE
    useEffect(() => {
        router.push(
            `/search/${
                searchText +
                queryString.replace(/page=\d/, `page=${currentPage}`)
            }`
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

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
                    <div className={style.searchedText}>
                        <span>
                            <span>{results}</span> Results for
                        </span>
                        <h2>{formatTitleCase(searchText)}</h2>
                    </div>
                </div>
                <div className={style.desktop}>
                    <div className={style.searched}>
                        <span>
                            Searched Text <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <div className={style.searchedText}>
                            <span>
                                <span>{results}</span> Results for
                            </span>
                            <h2>{formatTitleCase(searchText)}</h2>
                        </div>
                    </div>
                    <div className={style.filters}>
                        <span>
                            Filters <FontAwesomeIcon icon={faTasks} />
                        </span>
                        <FilterForm
                            searchText={searchText}
                            queryObject={queryObject}
                            categories={categories}
                            brands={brands}
                            filteringModal={filteringModal}
                        />
                    </div>
                </div>
            </div>
            <div className={style.results}>
                <div className={style.currentOrderBy}>
                    <span>
                        {orderBy === 'offer_price'
                            ? 'Sorted by Lowest Price'
                            : orderBy === '-offer_price'
                            ? 'Sorted by Highest Price'
                            : 'Unsorted'}
                    </span>
                </div>
                <div className={style.desktopOrderBy}>
                    <h3>Order By</h3>
                    <div>
                        <button
                            onClick={() => changeSorting('offer_price')}
                            style={
                                orderBy === 'offer_price'
                                    ? {
                                          boxShadow:
                                              '4px 4px var(--light-pink)',
                                          transform:
                                              'translateY(-4px) translateX(-4px)'
                                      }
                                    : {
                                          boxShadow: '4px 4px transparent',
                                          transform:
                                              'translateY(0) translateX(0)'
                                      }
                            }
                        >
                            <span>Lowest Price</span>{' '}
                            <FontAwesomeIcon icon={faSortAmountDesc} />
                        </button>
                        <button
                            onClick={() => changeSorting('-offer_price')}
                            style={
                                orderBy === '-offer_price'
                                    ? {
                                          boxShadow:
                                              '4px 4px var(--light-pink)',
                                          transform:
                                              'translateY(-4px) translateX(-4px)'
                                      }
                                    : {
                                          boxShadow: '4px 4px transparent',
                                          transform:
                                              'translateY(0) translateX(0)'
                                      }
                            }
                        >
                            <span>Highest Price</span>{' '}
                            <FontAwesomeIcon icon={faSortAmountAsc} />
                        </button>
                    </div>
                </div>
                <div className={style.grid}>
                    {products.map(product => (
                        <SearchCard
                            key={product.details.id}
                            product={product}
                            user={user}
                        />
                    ))}
                </div>
                <div className={style.pagination}>
                    <h2>
                        {`${
                            results <= 10
                                ? `1-${results}`
                                : `${
                                      (Number(currentPage) - 1) * 10 + 1
                                  }-${Math.min(
                                      Number(currentPage) * 10,
                                      results
                                  )}`
                        } of ${results} Products`}
                    </h2>
                    <div>
                        <button onClick={() => changePage('prev')}>Prev</button>
                        <div />
                        <span>{currentPage}</span>
                        <div />
                        <button onClick={() => changePage('next')}>Next</button>
                    </div>
                </div>
            </div>
            <dialog ref={filteringModalRef} className={style.modal}>
                <div>
                    <FilterForm
                        searchText={searchText}
                        queryObject={queryObject}
                        categories={categories}
                        brands={brands}
                        filteringModal={filteringModal}
                    />
                    <button onClick={() => filteringModal(false)}>Close</button>
                </div>
            </dialog>
            <dialog ref={sortingModalRef} className={style.modal}>
                <div>
                    <div className={style.mobileOrderBy}>
                        <h2>Order By</h2>
                        <div>
                            <button
                                style={{
                                    background:
                                        orderBy === 'offer_price'
                                            ? 'var(--main)'
                                            : 'var(--gray)'
                                }}
                                onClick={() => changeSorting('offer_price')}
                            >
                                Lowest Price
                            </button>
                            <button
                                style={{
                                    background:
                                        orderBy === '-offer_price'
                                            ? 'var(--main)'
                                            : 'var(--gray)'
                                }}
                                onClick={() => changeSorting('-offer_price')}
                            >
                                Highest Price
                            </button>
                            <button
                                style={{
                                    background:
                                        orderBy === ''
                                            ? 'var(--main)'
                                            : 'var(--gray)'
                                }}
                                onClick={() => changeSorting('')}
                            >
                                Any
                            </button>
                        </div>
                    </div>
                    <button onClick={() => sortingModal(false)}>Close</button>
                </div>
            </dialog>
        </div>
    )
}

export default SearchAndResults
