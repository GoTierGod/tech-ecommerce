'use client'

import style from './user-profile.module.css'

import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCartShopping,
    faEdit,
    faFile,
    faHeart,
    faHistory,
    faSignOut,
    faStar,
    faXmark
} from '@fortawesome/free-solid-svg-icons'

import { capitalizeFormatter } from '@/utils/formatting/capitalizeFormatter'
import { getCustomerAge } from '@/utils/customer/getCustomerAge'
import UserUpdate from './UserUpdate'
import ErrorDisplay from '../../../../components/ErrorDisplay'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ComposedCustomerData } from '@/types/customer'

interface UserProfileProps {
    customer: ComposedCustomerData
}

export default function UserProfile({ customer }: UserProfileProps) {
    const [updating, setUpdating] = useState(false as string | false)
    const [err, setErr] = useState(
        null as null | { message: string; status: number; statusText: string }
    )

    const updateField = useCallback(
        (field: string) => {
            setUpdating(field)
        },
        [setUpdating]
    )

    const fieldUpdated = useCallback(() => setUpdating(false), [setUpdating])

    const customerInfoKeys: { [key: string]: string } = useMemo(
        () => ({
            username: 'Username',
            email: 'Email',
            password: 'Password',
            phone: 'Phone',
            countrycity: 'Country & City',
            address: 'Address',
            firstname: 'Name',
            lastname: 'Last Name',
            birthdate: 'Birthdate',
            gender: 'Gender'
        }),
        []
    )

    const customerInfoValues: { [key: string]: string } = useMemo(
        () => ({
            username: customer.username,
            email: customer.email,
            password: '**************',
            phone: customer.phone || '. . .',
            countrycity:
                customer.country || customer.city
                    ? `${customer.country || '. . .'} / ${
                          customer.city || '. . .'
                      }`
                    : '. . .',
            address: customer.address || '. . .',
            firstname: customer.first_name || '. . .',
            lastname: customer.last_name || '. . .',
            birthdate: customer.birthdate,
            gender: customer.gender || '. . .'
        }),
        [customer]
    )

    const resetError = useCallback(() => setErr(null), [])

    return (
        <main
            style={
                err
                    ? {
                          background: 'var(--gray)',
                          padding: '2rem',
                          paddingTop: '99px',
                          minHeight: '100vh',
                          minWidth: '100%'
                      }
                    : {}
            }
        >
            {!err ? (
                <>
                    <Breadcrumbs
                        routeList={[{ path: '/profile', name: 'Profile' }]}
                    />
                    <div className={style.wrapper}>
                        <section className={style.wrapperLeft}>
                            <article>
                                <header className={style.header}>
                                    <h2>
                                        {capitalizeFormatter(customer.username)}
                                    </h2>
                                    <div className={style.points}>
                                        <FontAwesomeIcon icon={faStar} />
                                        {customer.points}
                                    </div>
                                </header>
                                <div className={style.content}>
                                    <Link href='/history' prefetch={false}>
                                        <FontAwesomeIcon icon={faHistory} />
                                        Purchases
                                    </Link>
                                    <Link href='/cart' prefetch={false}>
                                        <FontAwesomeIcon
                                            icon={faCartShopping}
                                        />
                                        Cart
                                    </Link>
                                    <Link href='/favorites' prefetch={false}>
                                        <FontAwesomeIcon icon={faHeart} />
                                        Favorites
                                    </Link>
                                    <Link href='/logout' prefetch={false}>
                                        <FontAwesomeIcon icon={faSignOut} />
                                        Logout
                                    </Link>
                                </div>
                            </article>
                            <article className={style.deleteAccount}>
                                <header className={style.header}>
                                    <h2>Delete</h2>
                                    <FontAwesomeIcon icon={faXmark} />
                                </header>
                                <div className={style.content}>
                                    <p>
                                        U will need to confirm after pressing
                                        the &quot;Delete Account&quot; button.
                                    </p>
                                    <Link href='/delete' prefetch={false}>
                                        Delete Account
                                    </Link>
                                </div>
                            </article>
                        </section>
                        <section className={style.wrapperRight}>
                            <header className={style.header}>
                                <h2>Information</h2>
                                <FontAwesomeIcon icon={faFile} />
                            </header>
                            {!updating ? (
                                <div className={style.grid}>
                                    <button
                                        className={style.cell}
                                        aria-label='Edit username'
                                        onClick={() => updateField('username')}
                                    >
                                        <div>
                                            <h2>{customerInfoKeys.username}</h2>
                                            <p>{customerInfoValues.username}</p>
                                        </div>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className={style.cell}
                                        aria-label='Edit email'
                                        onClick={() => updateField('email')}
                                    >
                                        <div>
                                            <h2>{customerInfoKeys.email}</h2>
                                            <p>{customerInfoValues.email}</p>
                                        </div>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className={style.cell}
                                        aria-label='Edit password'
                                        onClick={() => updateField('password')}
                                    >
                                        <div>
                                            <h2>{customerInfoKeys.password}</h2>
                                            <p>{customerInfoValues.password}</p>
                                        </div>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className={style.cell}
                                        aria-label='Edit phone number'
                                        onClick={() => updateField('phone')}
                                    >
                                        <div>
                                            <h2>{customerInfoKeys.phone}</h2>
                                            <p>{customerInfoValues.phone}</p>
                                        </div>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className={style.cell}
                                        aria-label='Edit country and city'
                                        onClick={() =>
                                            updateField('countrycity')
                                        }
                                    >
                                        <div>
                                            <h2>
                                                {customerInfoKeys.countrycity}
                                            </h2>
                                            <p>
                                                {customerInfoValues.countrycity}
                                            </p>
                                        </div>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className={style.cell}
                                        aria-label='Edit address'
                                        onClick={() => updateField('address')}
                                    >
                                        <div>
                                            <h2>{customerInfoKeys.address}</h2>
                                            <p>{customerInfoValues.address}</p>
                                        </div>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className={style.cell}
                                        aria-label='Edit first name'
                                        onClick={() => updateField('firstname')}
                                    >
                                        <div>
                                            <h2>
                                                {customerInfoKeys.firstname}
                                            </h2>
                                            <p>
                                                {customerInfoValues.firstname}
                                            </p>
                                        </div>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className={style.cell}
                                        aria-label='Edit last name'
                                        onClick={() => updateField('lastname')}
                                    >
                                        <div>
                                            <h2>{customerInfoKeys.lastname}</h2>
                                            <p>{customerInfoValues.lastname}</p>
                                        </div>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className={style.cell}
                                        aria-label='Edit birthdate'
                                        onClick={() => updateField('birthdate')}
                                    >
                                        <div>
                                            <h2>
                                                {customerInfoKeys.birthdate} (
                                                {getCustomerAge(
                                                    customer.birthdate
                                                )}{' '}
                                                yo)
                                            </h2>
                                            <p>
                                                {customerInfoValues.birthdate}
                                            </p>
                                        </div>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className={style.cell}
                                        aria-label='Edit gender'
                                        onClick={() => updateField('gender')}
                                    >
                                        <div>
                                            <h2>{customerInfoKeys.gender}</h2>
                                            <p>{customerInfoValues.gender}</p>
                                        </div>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </div>
                            ) : (
                                <UserUpdate
                                    updating={updating}
                                    fieldUpdated={fieldUpdated}
                                    setErr={setErr}
                                    customer={customer}
                                    customerInfoKeys={customerInfoKeys}
                                    customerInfoValues={customerInfoValues}
                                />
                            )}
                        </section>
                        <article className={style.deleteAccount}>
                            <header className={style.header}>
                                <h2>Delete</h2>
                                <FontAwesomeIcon icon={faXmark} />
                            </header>
                            <div className={style.content}>
                                <p>
                                    U will need to confirm after pressing the
                                    &quot;Delete Account&quot; button.
                                </p>
                                <Link href='/delete' prefetch={false}>
                                    Delete Account
                                </Link>
                            </div>
                        </article>
                    </div>
                </>
            ) : (
                <ErrorDisplay
                    {...err}
                    action={resetError}
                    actionText='Try again'
                />
            )}
        </main>
    )
}
