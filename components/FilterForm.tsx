'use client'

import { FormEvent, useState } from 'react'
import style from '../styles/filterForm.module.css'
import { Brand, Category } from '@/types/tables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

interface FilterFormProps {
    categories: Category[]
    brands: Brand[]
}

const FilterForm = ({ categories, brands }: FilterFormProps) => {
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [gaming, setGaming] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [installments, setInstallments] = useState('')

    const getQueryParams = () => {
        const filters = []
        minPrice.length > 0 && filters.push(`min_price=${minPrice}`)
        maxPrice.length > 0 && filters.push(`max_price=${maxPrice}`)
        gaming.length > 0 && filters.push(`is_gamer=${gaming}`)
        category.length > 0 && filters.push(`category=${category}`)
        brand.length > 0 && filters.push(`brand=${brand}`)
        installments.length > 0 && filters.push(`installments=${installments}`)

        return filters.length > 0 ? '?' + filters.join('&') : ''
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault()

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
                            onChange={e => setMinPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='min-price'>Max.</label>
                        <input
                            type='number'
                            name='max-price'
                            id='max-price'
                            placeholder='$ ∞'
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
                    <span onClick={e => setGaming('')}>Any</span>
                    <span onClick={e => setGaming('1')}>Yes</span>
                    <span onClick={e => setGaming('0')}>No</span>
                </div>
            </div>
            <div className={style.categoryFilter}>
                <label htmlFor='category'>Category</label>
                <select
                    onChange={e => setCategory(e.target.value)}
                    name='category'
                    id='category'
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
                    onChange={e => setBrand(e.target.value)}
                    name='brand'
                    id='brand'
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
                    onChange={e => setInstallments(e.target.value)}
                    name='installments'
                    id='installments'
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
