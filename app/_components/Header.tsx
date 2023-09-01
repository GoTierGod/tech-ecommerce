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
    const [dropdownMenu, setDropdownMenu] = useState(false)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        ;/.*[a-z].*/i.test(searchStr) &&
            router.push(`/search/${searchStr}?page=1`)
    }

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
                    aria-label='Toggle dropdown menu'
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <nav className={style.wideScreenNav}>
                    <ul className={style.links}>
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
                <Link
                    className={style.profileOrLogin}
                    href={user ? '/profile' : '/login'}
                    prefetch={false}
                >
                    <FontAwesomeIcon icon={faCircleUser} />
                    <span>{user ? user.user.username : 'Log in'}</span>
                </Link>
                {user ? (
                    <Link
                        className={style.logoutOrRegister}
                        href='/logout'
                        aria-label='Log Out'
                        prefetch={false}
                    >
                        <FontAwesomeIcon icon={faSignOut} />
                        <span>Log Out</span>
                    </Link>
                ) : (
                    <Link
                        className={style.logoutOrRegister}
                        href='/register'
                        prefetch={false}
                    >
                        <FontAwesomeIcon icon={faSignIn} />
                        <span>Register</span>
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
                                <span>Register</span>
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
                <nav className={style.smallScreenNav}>
                    <ul className={style.links}>
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
