'use client'

import style from '../styles/header.module.css'

import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faCircleUser,
    faCartShopping,
    faSearch
} from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Category } from '@/types/tables'

const titleCase = (str: string) =>
    str
        .replace(/\s/g, ' ')
        .split(' ')
        .map(word => word[0].toUpperCase() + word.substring(1))

interface HeaderProps {
    categories: Category[]
}

// WEBSITE HEADER/NAVBAR
export default function Header({ categories }: HeaderProps) {
    const router = useRouter()
    const path = usePathname()
    const [searchStr, setSearchStr] = useState('')
    const [category, setCategory] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        ;/.*[a-z].*/i.test(searchStr) && router.push(`/search/${searchStr}`)
    }

    useEffect(() => {
        if (path !== `/search/${category}`) setCategory('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path])

    useEffect(() => {
        if (category) {
            router.push(`/search/${category}`)
            setSearchStr('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

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
                        placeholder='search products...'
                        value={searchStr}
                        onChange={e => setSearchStr(e.target.value)}
                    />
                    <button type='submit' aria-label='Search'>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
                <div className={style.dropdownBtn}>
                    <FontAwesomeIcon icon={faBars} height='1rem' />
                </div>
                <nav className={style.wsNav}>
                    <ul className={style.links}>
                        <li className={style.categoriesSelect}>
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
                                    <option
                                        key={category.id}
                                        value={category.title}
                                    >
                                        {titleCase(category.title)}
                                    </option>
                                ))}
                            </select>
                        </li>
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
                <Link href='/' className={style.profile} aria-label='Profile'>
                    <span>Iván</span>
                    <FontAwesomeIcon icon={faCircleUser} />
                </Link>
                <Link href='/' className={style.cart} aria-label='Cart'>
                    <FontAwesomeIcon icon={faCartShopping} />
                </Link>
            </div>
        </header>
    )
}
