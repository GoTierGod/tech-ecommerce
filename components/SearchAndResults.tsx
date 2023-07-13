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
import { titleCase } from '@/helpers/titleCase'

interface SearchProps {
    searchText: string
    queryObject?: { [key: string]: string | string[] | undefined }
    queryString: string
    pages: number
    products: CardProductDetails[]
    categories: Category[]
    brands: Brand[]
}

const SearchAndResults = ({
    searchText,
    queryObject,
    queryString,
    pages,
    products,
    categories,
    brands
}: SearchProps) => {
    const router = useRouter()

    // CURRENT ORDER_BY PARAMETER
    const { order_by, page } = queryObject ?? {}

    // ORDER BY
    const [orderBy, setOrderBy] = useState((order_by as string) || '')
    const [currentPage, setCurrentPage] = useState((page as string) || '1')

    // MODAL REFERNECES
    const filteringModalRef: MutableRefObject<null | HTMLDialogElement> =
        useRef(null)
    const sortingModalRef: MutableRefObject<null | HTMLDialogElement> =
        useRef(null)

    // OPEN/CLOSE FILTERING MODAL
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

    // OPEN/CLOSE SORTING MODAL
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

    // SORTING CHANGES
    const changeSorting = (val: string) => {
        if (orderBy === val) setOrderBy('')
        else setOrderBy(val)

        sortingModal(false)
    }

    // CHANGE PAGE
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

    // CLOSE MODALS AFTER MAKING A REQUEST
    useEffect(() => {
        filteringModal(false)
        sortingModal(false)
    }, [queryString])

    // SORT PRODUCTS IF ORDER_BY PARAMETER IS DEFINED
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
            {/* HEADER IN SMALL SCREENS / LEFT SIDE IN WIDE SCREENS */}
            <div className={style.header}>
                {/* FOR SMALL SCREENS */}
                <div className={style.mobile}>
                    <div>
                        <button onClick={() => sortingModal(true)}>
                            <FontAwesomeIcon icon={faSortAmountDesc} /> Sort
                        </button>
                        <button onClick={() => filteringModal(true)}>
                            <FontAwesomeIcon icon={faTasks} /> Filter
                        </button>
                    </div>
                    <h2>{titleCase(searchText)}</h2>
                </div>
                {/* FOR WIDE SCREENS */}
                <div className={style.desktop}>
                    <div>
                        <span>
                            Searched Text <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <h2>{titleCase(searchText)}</h2>
                    </div>
                    <div>
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
            {/* RESULTS */}
            <div className={style.results}>
                {/* FEEDBACK ABOUT THE CURRENT SORTING TYPE */}
                <div className={style.phoneOrderBy}>
                    <span>
                        {orderBy === 'offer_price'
                            ? 'Sorted by Lowest Price'
                            : orderBy === '-offer_price'
                            ? 'Sorted by Highest Price'
                            : 'Unsorted'}
                    </span>
                </div>
                {/* SORTING BUTTONS FOR WIDE SCREENS */}
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
                {/* PRODUCTS FOUND. GRID IN SMALL SCREENS / LIST IN WIDE SCREENS */}
                <div className={style.grid}>
                    {products.map(product => (
                        <SearchCard
                            key={product.details.id}
                            product={product}
                        />
                    ))}
                </div>
                {/* PAGINATION */}
                <div className={style.pagination}>
                    <h2>
                        {`${Number(currentPage) * 10 - 10}-${
                            Number(currentPage) * 10
                        } of ${pages * 10} Products`}
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
            {/* FILTERING MODAL */}
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
            {/* SORTING MODAL */}
            <dialog ref={sortingModalRef} className={style.modal}>
                <div>
                    <div className={style.orderBy}>
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
