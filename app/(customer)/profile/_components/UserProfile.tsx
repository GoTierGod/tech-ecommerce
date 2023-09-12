'use client'

import style from './user-profile.module.css'

import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faStar } from '@fortawesome/free-solid-svg-icons'

import { Customer } from '@/types/users'
import { titleCaseFormatter } from '@/utils/formatting/titleCaseFormatter'
import { getCustomerAge } from '@/utils/customers/getCustomerAge'
import UserUpdate from './UserUpdate'
import ErrorDisplay from '../../../../components/ErrorDisplay'
import Breadcrumbs from '@/components/Breadcrumbs'

interface UserProfileProps {
    customer: Customer
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
            username: customer.user.username,
            email: customer.user.email,
            password: '**************',
            phone: customer.phone,
            countrycity: `${customer.country} / ${customer.city}`,
            address: customer.address,
            firstname: customer.user.first_name,
            lastname: customer.user.last_name,
            birthdate: customer.birthdate,
            gender: customer.gender
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
                        <div className={style.top}>
                            <div className={style.topLeft}>
                                <h1>
                                    {titleCaseFormatter(customer.user.username)}
                                </h1>
                                <div className={style.points}>
                                    <FontAwesomeIcon icon={faStar} />
                                    <span>{customer.points}</span>
                                </div>
                            </div>
                            <div className={style.topRight}>
                                <Link className={style.logout} href='/logout'>
                                    Log Out
                                </Link>
                                <Link className={style.delete} href='/delete'>
                                    Delete Account
                                </Link>
                            </div>
                        </div>
                        {!updating ? (
                            <div className={style.details}>
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
                                    onClick={() => updateField('countrycity')}
                                >
                                    <div>
                                        <h2>{customerInfoKeys.countrycity}</h2>
                                        <p>{customerInfoValues.countrycity}</p>
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
                                        <h2>{customerInfoKeys.firstname}</h2>
                                        <p>{customerInfoValues.firstname}</p>
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
                                            {getCustomerAge(customer.birthdate)}{' '}
                                            yo)
                                        </h2>
                                        <p>{customerInfoValues.birthdate}</p>
                                    </div>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <div
                                    className={style.cell}
                                    aria-label='Edit gender'
                                    onClick={() => updateField('gender')}
                                >
                                    <div>
                                        <h2>{customerInfoKeys.gender}</h2>
                                        <p>{customerInfoValues.gender}</p>
                                    </div>
                                    <FontAwesomeIcon icon={faEdit} />
                                </div>
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
                        <div className={style.bottom}>
                            <Link className={style.logout} href='/logout'>
                                Log Out
                            </Link>
                            <span>--- Be Careful ---</span>
                            <Link className={style.delete} href='/delete'>
                                Delete Account
                            </Link>
                        </div>
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
