'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import style from '../styles/filterForm.module.css'
import { Brand, Category } from '@/types/tables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

interface FilterFormProps {
    searchText: string
    categories: Category[]
    brands: Brand[]
    queryObject?: { [key: string]: string | string[] | undefined }
}

const FilterForm = ({
    searchText,
    categories,
    brands,
    queryObject
}: FilterFormProps) => {
    const router = useRouter()

    // CURRENT PARAMETERS
    const {
        min_price,
        max_price,
        is_gamer,
        category,
        brand,
        installments,
        order_by
    } = queryObject ?? {}

    // CONTROLLED FORM STATES
    const [minPrice, setMinPrice] = useState((min_price as string) || '')
    const [maxPrice, setMaxPrice] = useState((max_price as string) || '')
    const [isGamer, setIsGamer] = useState((is_gamer as string) || '')
    const [categoryState, setCategoryState] = useState(
        (category as string) || ''
    )
    const [brandState, setBrandState] = useState((brand as string) || '')
    const [installmentsState, setInstallmentsState] = useState(
        (installments as string) || ''
    )

    // CONSTRUCT A QUERY STRING USING ALL VALID PARAMETERS
    const getQueryParams = useCallback(() => {
        const filters = []

        minPrice.length > 0 && filters.push(`min_price=${minPrice}`)
        maxPrice.length > 0 && filters.push(`max_price=${maxPrice}`)
        isGamer.length > 0 && filters.push(`is_gamer=${isGamer}`)
        categoryState.length > 0 && filters.push(`category=${categoryState}`)
        brandState.length > 0 && filters.push(`brand=${brandState}`)
        installmentsState.length > 0 &&
            filters.push(`installments=${installmentsState}`)
        order_by && filters.push(`order_by=${order_by}`)

        return filters.length > 0 ? '?' + filters.join('&') : ''
    }, [
        minPrice,
        maxPrice,
        isGamer,
        categoryState,
        brandState,
        installmentsState,
        order_by
    ])

    // FILTER PRODUCTS WHEN THE FORM IS SUBMITTED
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        router.push(`/search/${searchText + getQueryParams()}`)
    }

    // FILTER PRODUCTS WHEN PARAMETERS CHANGES
    useEffect(() => {
        router.push(`/search/${searchText + getQueryParams()}`)

        // minPrice and maxPrice needs to be omitted as dependencies
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGamer, categoryState, brandState, installmentsState])

    return (
        <form onSubmit={e => handleSubmit(e)} className={style.form}>
            <div className={style.priceFilter}>
                <h3>Price</h3>
                <div>
                    <div>
                        <label htmlFor='min-price'>Min.</label>
                        <input
                            type='number'
                            name='min-price'
                            id='min-price'
                            placeholder='$ 0.00'
                            value={minPrice}
                            onChange={e => setMinPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='max-price'>Max.</label>
                        <input
                            type='number'
                            name='max-price'
                            id='max-price'
                            placeholder='$ ∞'
                            value={maxPrice}
                            onChange={e => setMaxPrice(e.target.value)}
                        />
                    </div>
                    <button type='submit'>
                        <FontAwesomeIcon icon={faCaretRight} />
                    </button>
                </div>
            </div>
            <div className={style.gamingFilter}>
                <h3>Gaming</h3>
                <div>
                    <span
                        style={{
                            background:
                                isGamer === '' ? 'var(--main)' : 'var(--gray)'
                        }}
                        onClick={e => {
                            setIsGamer('')
                        }}
                    >
                        Any
                    </span>
                    <span
                        style={{
                            background:
                                isGamer === '1' ? 'var(--main)' : 'var(--gray)'
                        }}
                        onClick={e => setIsGamer('1')}
                    >
                        Yes
                    </span>
                    <span
                        style={{
                            background:
                                isGamer === '0' ? 'var(--main)' : 'var(--gray)'
                        }}
                        onClick={e => setIsGamer('0')}
                    >
                        No
                    </span>
                </div>
            </div>
            <div className={style.categoryFilter}>
                <label htmlFor='category'>Category</label>
                <select
                    onChange={e => setCategoryState(e.target.value)}
                    name='category'
                    id='category'
                    value={categoryState}
                    style={
                        categoryState === ''
                            ? {
                                  background: 'var(--gray)',
                                  borderColor: 'var(--gray)'
                              }
                            : {
                                  background: 'var(--main)',
                                  borderColor: 'var(--main)'
                              }
                    }
                >
                    <option value=''>Any</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.title}>
                            {cat.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.brandFilter}>
                <label htmlFor='brand'>Brands</label>
                <select
                    onChange={e => setBrandState(e.target.value)}
                    name='brand'
                    id='brand'
                    value={brandState}
                    style={
                        brandState === ''
                            ? {
                                  background: 'var(--gray)',
                                  borderColor: 'var(--gray)'
                              }
                            : {
                                  background: 'var(--main)',
                                  borderColor: 'var(--main)'
                              }
                    }
                >
                    <option value=''>Any</option>
                    {brands.map(bra => (
                        <option key={bra.name} value={bra.name}>
                            {bra.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.installmentsFilter}>
                <label htmlFor='installments'>Installments</label>
                <select
                    onChange={e => setInstallmentsState(e.target.value)}
                    name='installments'
                    id='installments'
                    value={installmentsState}
                    style={
                        installmentsState === ''
                            ? {
                                  background: 'var(--gray)',
                                  borderColor: 'var(--gray)'
                              }
                            : {
                                  background: 'var(--main)',
                                  borderColor: 'var(--main)'
                              }
                    }
                >
                    <option value=''>Any</option>
                    <option value='6'>6</option>
                    <option value='12'>12</option>
                    <option value='24'>24</option>
                </select>
            </div>
        </form>
    )
}

export default FilterForm
