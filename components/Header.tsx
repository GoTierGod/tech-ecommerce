'use client'

import style from '../styles/header.module.css'

import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faCircleUser,
    faCartShopping,
    faSearch,
    faHeart,
    faSignOut
} from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Category } from '@/types/tables'
import { titleCase } from '@/helpers/titleCase'
import { Customer, User, UserData } from '@/types/users'
import { cookies } from 'next/dist/client/components/headers'
import Cookies from 'js-cookie'

interface HeaderProps {
    categories: Category[]
    user: UserData
}

// WEBSITE HEADER/NAVBAR
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
                element.style.padding = '1rem'
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
                const res = await fetch('/api/refresh', { method: 'post' })
                if (res.ok) router.refresh()
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path])

    return (
        <header className={style.header}>
            <div>
                <Link href='/' className={style.logo}>
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
                                {titleCase(category.title)}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={toggleDropdownMenu}
                    className={style.dropdownBtn}
                >
                    <FontAwesomeIcon icon={faBars} height='1rem' />
                </button>
                <nav className={style.wsNav}>
                    <ul className={style.links}>
                        <li>
                            <Link href='/'>Offers</Link>
                        </li>
                        <li>
                            <Link href='/'>Contact</Link>
                        </li>
                        <li>
                            <Link href='/'>About</Link>
                        </li>
                        <li>
                            <Link href='/'>Home</Link>
                        </li>
                    </ul>
                </nav>
                <Link
                    href={user ? '/' : '/login'}
                    className={style.profile}
                    aria-label='Profile'
                >
                    <span>
                        {user
                            ? (user as User).username ||
                              (user as Customer).user.username
                            : 'Log in'}
                    </span>
                    <FontAwesomeIcon icon={faCircleUser} />
                </Link>
                {user && (
                    <Link
                        href='/logout'
                        className={style.logout}
                        aria-label='Log Out'
                    >
                        <FontAwesomeIcon icon={faSignOut} />
                    </Link>
                )}
            </div>
            <div ref={dropdownMenuRef} className={style.dropdownMenu}>
                <div>
                    <div>
                        <Link href={user ? '/' : '/login'}>
                            <FontAwesomeIcon icon={faCircleUser} />
                            <span>
                                {user
                                    ? (user as User).username ||
                                      (user as Customer).user.username
                                    : 'Log in'}
                            </span>
                        </Link>
                        {user && (
                            <Link href='/logout'>
                                <FontAwesomeIcon icon={faSignOut} />
                                <span>Log Out</span>
                            </Link>
                        )}
                    </div>
                    <div>
                        <Link href='/'>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span>Cart</span>
                        </Link>
                        <Link href='/'>
                            <FontAwesomeIcon icon={faHeart} />
                            <span>Favorites</span>
                        </Link>
                    </div>
                </div>
                <ul>
                    <li>
                        <Link href='/'>Offers</Link>
                    </li>
                    <li>
                        <Link href='/'>Contact</Link>
                    </li>
                    <li>
                        <Link href='/'>About</Link>
                    </li>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
