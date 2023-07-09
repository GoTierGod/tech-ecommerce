'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../styles/searchAndResults.module.css'

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
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchProps {
    searchText: string
    categories: Category[]
    brands: Brand[]
    products: CardProductDetails[]
    queryObject?: { [key: string]: string | string[] | undefined }
    queryString: string
}

const SearchAndResults = ({
    searchText,
    categories,
    brands,
    products,
    queryObject,
    queryString
}: SearchProps) => {
    const router = useRouter()

    // CURRENT ORDER_BY PARAMETER
    const { order_by } = queryObject ?? {}

    // ORDER BY
    const [orderBy, setOrderBy] = useState((order_by as string) || '')

    // MODAL REFERNECES
    const filteringModalRef: MutableRefObject<null | HTMLDialogElement> =
        useRef(null)
    const sortingModalRef: MutableRefObject<null | HTMLDialogElement> =
        useRef(null)

    // OPEN/CLOSE FILTERING MODAL
    const filteringModal = (bool: boolean) => {
        if (filteringModalRef.current) {
            bool
                ? filteringModalRef.current.showModal()
                : filteringModalRef.current.close()
        }
    }

    // OPEN/CLOSE SORTING MODAL
    const sortingModal = (bool: boolean) => {
        if (sortingModalRef.current) {
            bool
                ? sortingModalRef.current.showModal()
                : sortingModalRef.current.close()
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

        return queryString.length > 0 ? '?' + queryString.replace('?', '') : ''
    }, [queryString, orderBy])

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
                    <h2>{searchText.replace(/(\s|\%20)+/g, ' ')}</h2>
                </div>
                <div className={style.desktop}>
                    <div>
                        <h2>
                            Searched Text <FontAwesomeIcon icon={faSearch} />
                        </h2>
                        <p>{searchText.replace(/(\s|\%20)+/g, ' ')}</p>
                    </div>
                    <div>
                        <h2>
                            Filters <FontAwesomeIcon icon={faTasks} />
                        </h2>
                        <FilterForm
                            searchText={searchText}
                            categories={categories}
                            brands={brands}
                            queryObject={queryObject}
                        />
                    </div>
                </div>
            </div>
            <div className={style.results}>
                <div className={style.desktopOrderBy}>
                    <h3>Order By</h3>
                    <div>
                        <button
                            onClick={() => setOrderBy('offer_price')}
                            style={
                                orderBy === 'offer_price'
                                    ? {
                                          textShadow:
                                              '1px 1px var(--light-pink)',
                                          boxShadow:
                                              '2px 2px var(--light-pink)',
                                          transform:
                                              'translateY(-2px) translateX(-2px)'
                                      }
                                    : {}
                            }
                        >
                            <span>Lower Price</span>{' '}
                            <FontAwesomeIcon
                                icon={faSortAmountDesc}
                                style={
                                    orderBy === 'offer_price'
                                        ? {
                                              filter: 'drop-shadow(2px 2px var(--light-pink))'
                                          }
                                        : {}
                                }
                            />
                        </button>
                        <button
                            onClick={() => setOrderBy('-offer_price')}
                            style={
                                orderBy === '-offer_price'
                                    ? {
                                          textShadow:
                                              '1px 1px var(--light-pink)',
                                          boxShadow:
                                              '2px 2px var(--light-pink)',
                                          transform:
                                              'translateY(-2px) translateX(-2px)'
                                      }
                                    : {}
                            }
                        >
                            <span>Higher Price</span>{' '}
                            <FontAwesomeIcon
                                icon={faSortAmountAsc}
                                style={
                                    orderBy === '-offer_price'
                                        ? {
                                              filter: 'drop-shadow(2px 2px var(--light-pink))'
                                          }
                                        : {}
                                }
                            />
                        </button>
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
                        searchText={searchText}
                        categories={categories}
                        brands={brands}
                        queryObject={queryObject}
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
