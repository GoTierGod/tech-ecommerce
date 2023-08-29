'use client'

import { SearchResponse } from '@/types/search'
import style from './search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowDownWideShort,
    faCaretDown,
    faCaretRight,
    faCaretUp,
    faGripHorizontal,
    faListCheck,
    faSearch
} from '@fortawesome/free-solid-svg-icons'
import { titleCaseFormatter } from '@/utils/formatting/titleCaseFormatter'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import HorizontalCard from '@/components/HoritonzalCard'

interface SearchProps {
    searchStr: string
    searchParams: { [key: string]: string | string[] | undefined } | undefined
    searchRes: SearchResponse
}

export default function Search({
    searchStr,
    searchParams,
    searchRes
}: SearchProps) {
    const router = useRouter()

    const {
        min_price,
        max_price,
        is_gamer,
        category,
        brand,
        installments,
        order_by,
        page
    } = searchParams ?? {}

    const [sortMenu, setSortMenu] = useState(false)
    const [isGamer, setIsGamer] = useState(is_gamer || '')
    const [currentPage, setCurrentPage] = useState(page || '1')
    const [orderBy, setOrderBy] = useState(order_by || '')
    const [showFilter, setShowFilter] = useState(false)

    const Formik = useFormik({
        initialValues: {
            min_price: min_price || '',
            max_price: max_price || '',
            is_gamer: isGamer,
            category: category || '',
            brand: brand || '',
            installments: installments || '',
            order_by: order_by || '',
            page: page || '1'
        },
        onSubmit: async values => {
            const composeQueryParams = () => {
                const filters = []

                values.min_price &&
                    filters.push(`min_price=${values.min_price}`)
                values.max_price &&
                    filters.push(`max_price=${values.max_price}`)
                values.is_gamer && filters.push(`is_gamer=${values.is_gamer}`)
                values.category && filters.push(`category=${values.category}`)
                values.brand && filters.push(`brand=${values.brand}`)
                values.installments &&
                    filters.push(`installments=${values.installments}`)
                values.order_by && filters.push(`order_by=${values.order_by}`)
                values.page && filters.push(`page=${values.page}`)

                return filters.length > 0 ? '?' + filters.join('&') : ''
            }

            router.push(`/search/${searchStr + composeQueryParams()}`)
        },
        validationSchema: Yup.object({
            min_price: Yup.number().min(0).max(10000).nullable().default(null),
            max_price: Yup.number()
                .positive()
                .max(10000)
                .nullable()
                .default(null),
            is_gamer: Yup.string()
                .oneOf(['', '1', '0'])
                .nullable()
                .default(null),
            category: Yup.string()
                .oneOf(searchRes.categories.map(category => category.title))
                .nullable()
                .default(null),
            brand: Yup.string()
                .oneOf(searchRes.brands.map(brand => brand.name))
                .nullable()
                .default(null),
            installments: Yup.string()
                .oneOf(['', '6', '12', '24'])
                .nullable()
                .default(null),
            order_by: Yup.string()
                .oneOf(['', '-offer_price', 'offer_price'])
                .nullable()
                .default(null),
            page: Yup.number().min(1).max(searchRes.pages).default(1)
        })
    })

    const changePage = useCallback(
        (toPage: string) => {
            if (toPage === 'next' && Number(currentPage) < searchRes.pages) {
                setCurrentPage(prevPage => (Number(prevPage) + 1).toString())
            } else if (toPage === 'prev' && Number(currentPage) > 1) {
                setCurrentPage(prevPage => (Number(prevPage) - 1).toString())
            }
        },
        [currentPage, searchRes.pages]
    )

    useEffect(() => {
        Formik.setFieldValue('is_gamer', isGamer, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGamer])

    useEffect(() => {
        Formik.setFieldValue('page', currentPage, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    useEffect(() => {
        Formik.setFieldValue('order_by', orderBy, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderBy])

    useEffect(() => {
        Formik.submitForm()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        Formik.values.is_gamer,
        Formik.values.page,
        Formik.values.order_by,
        Formik.values.brand,
        Formik.values.category,
        Formik.values.installments
    ])

    const filterForm = (screen: 'small' | 'wide') => (
        <form
            className={style.form}
            onSubmit={Formik.handleSubmit}
            style={
                screen === 'small'
                    ? showFilter
                        ? {
                              maxHeight: '442px',
                              padding: '1.5rem'
                          }
                        : {
                              maxHeight: '0',
                              padding: '0 1.5rem'
                          }
                    : {}
            }
        >
            <div className={style.priceField}>
                <h3>Price</h3>
                <div>
                    <div className={style.formField}>
                        <label htmlFor='min-price'>Min.</label>
                        <input
                            type='number'
                            id='min-price'
                            placeholder='0'
                            min={0}
                            max={10000}
                            {...Formik.getFieldProps('min_price')}
                        />
                    </div>
                    <div className={style.formField}>
                        <label htmlFor='max-price'>Max.</label>
                        <input
                            type='number'
                            id='max-price'
                            placeholder='1'
                            min={1}
                            max={10000}
                            {...Formik.getFieldProps('max_price')}
                        />
                    </div>
                    <button type='submit'>
                        <FontAwesomeIcon icon={faCaretRight} />
                    </button>
                </div>
            </div>
            <div className={style.gamerField}>
                <h3>Gamer</h3>
                <div>
                    <label htmlFor='any'>
                        <input
                            type='checkbox'
                            id='any'
                            name='gamer'
                            value=''
                            checked={isGamer === ''}
                            onChange={() => setIsGamer('')}
                        />
                        Any
                    </label>
                    <label htmlFor='yes'>
                        <input
                            type='checkbox'
                            id='yes'
                            name='gamer'
                            value='1'
                            checked={isGamer === '1'}
                            onChange={() => setIsGamer('1')}
                        />
                        Yes
                    </label>
                    <label htmlFor='no'>
                        <input
                            type='checkbox'
                            id='no'
                            name='gamer'
                            value='0'
                            checked={isGamer === '0'}
                            onChange={() => setIsGamer('0')}
                        />
                        No
                    </label>
                </div>
            </div>
            <div className={style.formField}>
                <label htmlFor='brand'>Brand</label>
                <select id='brand' {...Formik.getFieldProps('brand')}>
                    <option value=''>Any</option>
                    {searchRes.brands.map(brand => (
                        <option key={brand.id} value={brand.name}>
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.formField}>
                <label htmlFor='category'>Category</label>
                <select id='category' {...Formik.getFieldProps('category')}>
                    <option value=''>Any</option>
                    {searchRes.categories.map(category => (
                        <option key={category.id} value={category.title}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.formField}>
                <label htmlFor='installments'>Installments</label>
                <select id='installments' {...Formik.getFieldProps('brand')}>
                    <option value=''>Any</option>
                    <option value='6'>6</option>
                    <option value='12'>12</option>
                    <option value='24'>24</option>
                </select>
            </div>
        </form>
    )

    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.wrapperLeft}>
                    <div className={style.stickyWrapper}>
                        <div className={style.searched}>
                            <div className={style.header}>
                                <h2>Searched</h2>
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                            <div className={style.content}>
                                <span>{searchRes.results} Results for</span>
                                <p>{titleCaseFormatter(searchStr)}</p>
                            </div>
                        </div>
                        <div className={style.filter}>
                            <div className={style.header}>
                                <h2>Filter</h2>
                                <FontAwesomeIcon icon={faListCheck} />
                                <button
                                    onClick={() =>
                                        setShowFilter(
                                            prevShowFilter => !prevShowFilter
                                        )
                                    }
                                    style={
                                        showFilter
                                            ? {
                                                  backgroundColor:
                                                      'var(--white)',
                                                  color: 'var(--gray)'
                                              }
                                            : {
                                                  backgroundColor:
                                                      'var(--gray)',
                                                  color: 'var(--white)'
                                              }
                                    }
                                >
                                    Filter
                                    <FontAwesomeIcon icon={faListCheck} />
                                </button>
                            </div>
                            <div className={style.smallScreenForm}>
                                {filterForm('small')}
                            </div>
                            <div className={style.wideScreenForm}>
                                {filterForm('wide')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.wrapperRight}>
                    <div className={style.header}>
                        <h2>Results</h2>
                        <div className={style.sort}>
                            <button
                                onClick={() =>
                                    setSortMenu(prevSortMenu => !prevSortMenu)
                                }
                                style={
                                    sortMenu
                                        ? {
                                              backgroundColor: 'var(--white)',
                                              color: 'var(--gray)'
                                          }
                                        : {
                                              backgroundColor: 'var(--gray)',
                                              color: 'var(--white)'
                                          }
                                }
                            >
                                <span>Sort By</span>
                                <FontAwesomeIcon icon={faArrowDownWideShort} />
                            </button>
                            <div
                                style={
                                    sortMenu
                                        ? {
                                              maxHeight: '127px',
                                              padding: '0.5rem'
                                          }
                                        : {
                                              maxHeight: '0',
                                              padding: '0 0.5rem'
                                          }
                                }
                            >
                                <button
                                    onClick={() => setOrderBy('offer_price')}
                                    style={
                                        orderBy === 'offer_price'
                                            ? {
                                                  backgroundColor:
                                                      'var(--white)',
                                                  color: 'var(--gray)'
                                              }
                                            : {
                                                  backgroundColor:
                                                      'var(--gray)',
                                                  color: 'var(--white)'
                                              }
                                    }
                                >
                                    Lowest Price
                                </button>
                                <button
                                    onClick={() => setOrderBy('-offer_price')}
                                    style={
                                        orderBy === '-offer_price'
                                            ? {
                                                  backgroundColor:
                                                      'var(--white)',
                                                  color: 'var(--gray)'
                                              }
                                            : {
                                                  backgroundColor:
                                                      'var(--gray)',
                                                  color: 'var(--white)'
                                              }
                                    }
                                >
                                    Highest Price
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={style.grid}>
                        {searchRes.products.map(product => (
                            <HorizontalCard
                                key={product.details.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
                <div className={style.pagination}>
                    <h2>
                        {`${
                            searchRes.results <= 10
                                ? `1-${searchRes.results}`
                                : `${
                                      (Number(currentPage) - 1) * 10 + 1
                                  }-${Math.min(
                                      Number(currentPage) * 10,
                                      searchRes.results
                                  )}`
                        } of ${searchRes.results} Products`}
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
        </main>
    )
}
