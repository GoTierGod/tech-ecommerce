'use client'

import style from './header.module.css'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faCircleUser,
    faCartShopping,
    faSearch,
    faHeart,
    faSignOut,
    faSignIn
} from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useCallback, useEffect, useState } from 'react'

import { Category } from '@/types/tables'
import { titleCaseFormatter } from '@/utils/formatting/titleCaseFormatter'
import { CustomerData } from '@/types/customer'

interface HeaderProps {
    categories: Category[]
    customer: CustomerData
}

export default function Header({ categories, customer }: HeaderProps) {
    const router = useRouter()
    const path = usePathname()
    const [searchStr, setSearchStr] = useState('')
    const [category, setCategory] = useState('')
    const [dropdownMenu, setDropdownMenu] = useState(false)

    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            if (/.*[a-z].*/i.test(searchStr))
                router.push(`/search/${searchStr}?page=1`)
        },
        [router, searchStr]
    )

    const toggleDropdownMenu = useCallback(() => {
        setDropdownMenu(prevDropdownMenu => !prevDropdownMenu)
    }, [setDropdownMenu])

    useEffect(() => {
        if (path !== `/search/${category}?page=1`) setCategory('')
        if (!path.includes('/search/')) setSearchStr('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path])

    useEffect(() => {
        if (category) {
            setSearchStr('')
            router.push(`/search/${category}?page=1`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    useEffect(() => {
        setDropdownMenu(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path])

    return (
        <header className={style.header}>
            <div className={style.wrapper}>
                <Link href='/' className={style.logo} prefetch={false}>
                    <Image
                        src='/next.svg'
                        alt='Website logo'
                        height={48}
                        width={48}
                        quality='100'
                    />
                </Link>
                <form
                    className={style.searchBar}
                    onSubmit={e => handleSubmit(e)}
                >
                    <input
                        type='search'
                        name='search'
                        id='search'
                        placeholder='Search products...'
                        value={searchStr}
                        onChange={e => setSearchStr(e.target.value)}
                    />
                    <button type='submit' aria-label='Search'>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
                <select
                    className={style.categories}
                    name='categories'
                    id='categories'
                    onChange={e => setCategory(e.target.value)}
                    value={category}
                >
                    <option value='' hidden>
                        Categories
                    </option>
                    {categories.map(category => (
                        <option key={category.id} value={category.title}>
                            {titleCaseFormatter(category.title)}
                        </option>
                    ))}
                </select>
                <button
                    onClick={toggleDropdownMenu}
                    className={style.dropdownBtn}
                    aria-label='Toggle dropdown menu'
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <nav className={style.wideScreenNav}>
                    <ul>
                        <li>
                            <Link href='/contact' prefetch={false}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href='/about' prefetch={false}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href='/' prefetch={false}>
                                Home
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className={style.wideScreenUserLinks}>
                    <Link
                        className={style.wideScreenLink}
                        href={customer ? '/profile' : '/login'}
                        prefetch={false}
                    >
                        <FontAwesomeIcon icon={faCircleUser} />
                        {customer ? customer.username : 'Log in'}
                    </Link>
                    {customer ? (
                        <>
                            <Link
                                className={style.wideScreenLink}
                                href='/cart'
                                prefetch={false}
                                aria-label='Cart'
                            >
                                <FontAwesomeIcon icon={faCartShopping} />
                            </Link>
                            <Link
                                className={style.wideScreenLink}
                                href='/favorites'
                                prefetch={false}
                                aria-label='Favorites'
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </Link>
                        </>
                    ) : (
                        <Link
                            className={style.wideScreenLink}
                            href='/register'
                            prefetch={false}
                        >
                            <FontAwesomeIcon icon={faSignIn} />
                            Register
                        </Link>
                    )}
                </div>
                {customer && (
                    <Link
                        className={style.wideScreenLink}
                        href='/logout'
                        prefetch={false}
                        aria-label='Log Out'
                    >
                        <FontAwesomeIcon icon={faSignOut} />
                    </Link>
                )}
            </div>
            <div
                className={style.dropdownMenu}
                style={
                    dropdownMenu
                        ? {
                              maxHeight: '160px',
                              paddingTop: '1rem'
                          }
                        : {
                              maxHeight: '0',
                              paddingTop: '0'
                          }
                }
            >
                <div className={style.smallScreenUserLinks}>
                    <div>
                        <Link
                            href={customer ? '/profile' : '/login'}
                            prefetch={false}
                        >
                            <FontAwesomeIcon icon={faCircleUser} />
                            {customer ? customer.username : 'Log in'}
                        </Link>
                        {customer ? (
                            <Link href='/logout' prefetch={false}>
                                <FontAwesomeIcon icon={faSignOut} />
                                Log Out
                            </Link>
                        ) : (
                            <Link href='/register' prefetch={false}>
                                <FontAwesomeIcon icon={faSignIn} />
                                Register
                            </Link>
                        )}
                    </div>
                    {customer && (
                        <div>
                            <Link href='/cart' prefetch={false}>
                                <FontAwesomeIcon icon={faCartShopping} />
                                Cart
                            </Link>
                            <Link href='/favorites' prefetch={false}>
                                <FontAwesomeIcon icon={faHeart} />
                                Favorites
                            </Link>
                        </div>
                    )}
                </div>
                <nav className={style.smallScreenNav}>
                    <ul>
                        <li>
                            <Link href='/contact' prefetch={false}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href='/about' prefetch={false}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href='/' prefetch={false}>
                                Home
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
