'use client'

import style from '../styles/header.module.css'

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
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'

import { Category } from '@/types/tables'
import { titleCaseFormatter } from '@/utils/formatting/titleCaseFormatter'
import { CustomerData } from '@/types/users'

interface HeaderProps {
    categories: Category[]
    user: CustomerData
}

export default function Header({ categories, user }: HeaderProps) {
    const router = useRouter()
    const path = usePathname()
    const [searchStr, setSearchStr] = useState('')
    const [category, setCategory] = useState('')
    const dropdownMenuRef = useRef(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        ;/.*[a-z].*/i.test(searchStr) && router.push(`/search/${searchStr}`)
    }

    const toggleDropdownMenu = useCallback(() => {
        if (dropdownMenuRef.current) {
            const element: HTMLDivElement = dropdownMenuRef.current

            if (element.offsetHeight.toString() === '0') {
                element.style.height = 'auto'
                element.style.paddingTop = '1rem'
            } else {
                element.style.height = '0'
                element.style.padding = '0'
            }
        }
    }, [dropdownMenuRef])

    useEffect(() => {
        if (path !== `/search/${category}`) setCategory('')
        if (!path.includes('/search/')) setSearchStr('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path])

    useEffect(() => {
        if (category) {
            router.push(`/search/${category}`)
            setSearchStr('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    useEffect(() => {
        if (dropdownMenuRef.current) {
            const element: HTMLDivElement = dropdownMenuRef.current

            if (element.offsetHeight > 0) toggleDropdownMenu()
        }
    }, [path, dropdownMenuRef, toggleDropdownMenu])

    useEffect(() => {
        if (user && !Cookies.get('authTokens')) router.refresh()

        if (!user && Cookies.get('authTokens')) {
            ;(async () => {
                router.push(`/api/auth/refresh?path=${path}`)
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path])

    return (
        <header className={style.header}>
            <div className={style.wrapper}>
                <Link href='/' className={style.logo} prefetch={false}>
                    <Image
                        src='/next.svg'
                        alt='All Tech logo'
                        height={48}
                        width={48}
                        quality='100'
                    />
                </Link>
                <form
                    onSubmit={e => handleSubmit(e)}
                    className={style.searchBar}
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
                <div className={style.categoriesSelect}>
                    <select
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
                </div>
                <button
                    onClick={toggleDropdownMenu}
                    className={style.dropdownBtn}
                    aria-label='Dropdown menu'
                >
                    <FontAwesomeIcon icon={faBars} height='1rem' />
                </button>
                <nav className={style.wideNav}>
                    <ul className={style.links}>
                        <li>
                            <Link href='/' prefetch={false}>
                                Offers
                            </Link>
                        </li>
                        <li>
                            <Link href='/' prefetch={false}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href='/' prefetch={false}>
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
                <Link
                    href={user ? '/profile' : '/login'}
                    className={style.profile}
                    prefetch={false}
                >
                    <FontAwesomeIcon icon={faCircleUser} />
                    <span>{user ? user.user.username : 'Log in'}</span>
                </Link>
                {user ? (
                    <Link
                        href='/logout'
                        className={style.logout}
                        aria-label='Log Out'
                        prefetch={false}
                    >
                        <FontAwesomeIcon icon={faSignOut} />
                    </Link>
                ) : (
                    <Link
                        href='/register'
                        className={style.logout}
                        prefetch={false}
                    >
                        <FontAwesomeIcon icon={faSignIn} />
                        <span>Sign Up</span>
                    </Link>
                )}
            </div>
            <div ref={dropdownMenuRef} className={style.dropdownMenu}>
                <div className={style.options}>
                    <div>
                        <Link
                            href={user ? '/profile' : '/login'}
                            prefetch={false}
                        >
                            <FontAwesomeIcon icon={faCircleUser} />
                            <span>{user ? user.user.username : 'Log in'}</span>
                        </Link>
                        {user ? (
                            <Link href='/logout' prefetch={false}>
                                <FontAwesomeIcon icon={faSignOut} />
                                <span>Log Out</span>
                            </Link>
                        ) : (
                            <Link href='/register' prefetch={false}>
                                <FontAwesomeIcon icon={faSignIn} />
                                <span>Sign Up</span>
                            </Link>
                        )}
                    </div>
                    <div>
                        <Link href='/cart' prefetch={false}>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span>Cart</span>
                        </Link>
                        <Link href='/favorites' prefetch={false}>
                            <FontAwesomeIcon icon={faHeart} />
                            <span>Favorites</span>
                        </Link>
                    </div>
                </div>
                <nav className={style.smallNav}>
                    <ul className={style.links}>
                        <li>
                            <Link href='/' prefetch={false}>
                                Offers
                            </Link>
                        </li>
                        <li>
                            <Link href='/' prefetch={false}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href='/' prefetch={false}>
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
