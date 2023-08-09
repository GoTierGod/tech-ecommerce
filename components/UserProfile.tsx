'use client'

import style from '../styles/user-profile.module.css'

import Link from 'next/link'
import { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faStar } from '@fortawesome/free-solid-svg-icons'

import { Customer } from '@/types/users'
import { formatTitleCase } from '@/helpers/formatTitleCase'
import { getAge } from '@/helpers/getAge'
import UserUpdate from './UserUpdate'
import ErrorDisplay from './ErrorDisplay'

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

    const ResetError = () => setErr(null)

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
                <div className={style.wrapper}>
                    <div className={style.top}>
                        <div className={style.topLeft}>
                            <h1>{formatTitleCase(customer.user.username)}</h1>
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
                                    <h2>Username</h2>
                                    <p>{customer.user.username}</p>
                                </div>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                                className={style.cell}
                                aria-label='Edit email'
                                onClick={() => updateField('email')}
                            >
                                <div>
                                    <h2>Email</h2>
                                    <p>{customer.user.email}</p>
                                </div>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                                className={style.cell}
                                aria-label='Edit password'
                                onClick={() => updateField('password')}
                            >
                                <div>
                                    <h2>Password</h2>
                                    <p>**************</p>
                                </div>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                                className={style.cell}
                                aria-label='Edit phone number'
                                onClick={() => updateField('phone')}
                            >
                                <div>
                                    <h2>Phone</h2>
                                    <p>{customer.phone}</p>
                                </div>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                                className={style.cell}
                                aria-label='Edit country and city'
                                onClick={() => updateField('countrycity')}
                            >
                                <div>
                                    <h2>Country / City</h2>
                                    <p>
                                        {customer.country} / {customer.city}
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
                                    <h2>Address</h2>
                                    <p>{customer.address}</p>
                                </div>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                                className={style.cell}
                                aria-label='Edit first name'
                                onClick={() => updateField('firstname')}
                            >
                                <div>
                                    <h2>Name</h2>
                                    <p>{customer.user.first_name}</p>
                                </div>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                                className={style.cell}
                                aria-label='Edit last name'
                                onClick={() => updateField('lastname')}
                            >
                                <div>
                                    <h2>Lastname</h2>
                                    <p>{customer.user.last_name}</p>
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
                                        Birthdate ({getAge(customer.birthdate)}{' '}
                                        yo)
                                    </h2>
                                    <p>{customer.birthdate}</p>
                                </div>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <div
                                className={style.cell}
                                aria-label='Edit gender'
                                onClick={() => updateField('gender')}
                            >
                                <div>
                                    <h2>Gender</h2>
                                    <p>{customer.gender}</p>
                                </div>
                                <FontAwesomeIcon icon={faEdit} />
                            </div>
                        </div>
                    ) : (
                        <UserUpdate
                            editing={updating}
                            fieldUpdated={fieldUpdated}
                            setErr={setErr}
                            customer={customer}
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
            ) : (
                <ErrorDisplay
                    {...err}
                    action={ResetError}
                    actionText='Try again'
                />
            )}
        </main>
    )
}
