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
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

const CategoryOptions = [
    {
        value: 'smartphones',
        href: '/'
    },
    {
        value: 'laptops',
        href: '/'
    },
    {
        value: 'graphic-cards',
        href: '/'
    }
]

const titleCase = (str: string) =>
    str
        .replace(/\s/g, ' ')
        .split(' ')
        .map(word => word[0].toUpperCase() + word.substring(1))

// WEBSITE HEADER/NAVBAR
const Header = () => {
    const [searchStr, setSearchStr] = useState('')
    const router = useRouter()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        ;/.*[a-z].*/i.test(searchStr) && router.push(`/search/${searchStr}`)
    }

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
                        <li className={style.categoriesBtn}>
                            <select name='categoriesBtn' id='categoriesBtn'>
                                <option value=''>Categories</option>
                                {CategoryOptions.map(category => (
                                    <option
                                        key={category.value}
                                        value={category.value}
                                    >
                                        {titleCase(category.value)}
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

export default Header
