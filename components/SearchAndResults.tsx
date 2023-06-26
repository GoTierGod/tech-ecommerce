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
import { MutableRefObject, useEffect, useMemo, useRef } from 'react'

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
    const filterModalRef: MutableRefObject<null | HTMLDialogElement> =
        useRef(null)
    const sortingModalRef: MutableRefObject<null | HTMLDialogElement> =
        useRef(null)

    const filterModal = (bool: boolean) => {
        if (filterModalRef.current) {
            bool
                ? filterModalRef.current.showModal()
                : filterModalRef.current.close()
        }
    }

    const sortingModal = (bool: boolean) => {
        if (sortingModalRef.current) {
            bool
                ? sortingModalRef.current.showModal()
                : sortingModalRef.current.close()
        }
    }

    // Close the modal after making a request
    useEffect(() => {
        filterModal(false)
    }, [query])

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.mobile}>
                    <div>
                        <button onClick={() => sortingModal(true)}>
                            <FontAwesomeIcon icon={faSortAmountDesc} /> Sort
                        </button>
                        <button onClick={() => filterModal(true)}>
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
                        <SearchCard
                            key={product.details.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
            <dialog ref={filterModalRef} className={style.modal}>
                <div>
                    <FilterForm
                        search={search}
                        categories={categories}
                        brands={brands}
                    />
                    <button onClick={() => filterModal(false)}>Close</button>
                </div>
            </dialog>
            <dialog ref={sortingModalRef} className={style.modal}>
                <div>
                    <div>Sorting options...</div>
                    <button onClick={() => sortingModal(false)}>Close</button>
                </div>
            </dialog>
        </div>
    )
}

export default SearchAndResults
