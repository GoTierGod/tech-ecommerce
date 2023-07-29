'use client'

import { formatTitleCase } from '@/helpers/formatTitleCase'
import style from '../styles/user-profile.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Customer } from '@/types/users'
import { faEdit, faStar } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useState } from 'react'
import { getAge } from '@/helpers/getAge'
import UserUpdate from './UserUpdate'
import Link from 'next/link'

interface UserProfileProps {
    customer: Customer
}

export default function UserProfile({ customer }: UserProfileProps) {
    const [updating, setUpdating] = useState(false as string | false)

    const updateField = useCallback(
        (field: string) => {
            setUpdating(field)
        },
        [setUpdating]
    )

    const fieldUpdated = useCallback(() => setUpdating(false), [setUpdating])

    return (
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
                    <button className={style.delete}>Delete Account</button>
                </div>
            </div>
            {!updating ? (
                <div className={style.details}>
                    <div className={style.cell}>
                        <div>
                            <h2>Username</h2>
                            <p>{customer.user.username}</p>
                        </div>
                        <button onClick={() => updateField('username')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                    <div className={style.cell}>
                        <div>
                            <h2>Email</h2>
                            <p>{customer.user.email}</p>
                        </div>
                        <button onClick={() => updateField('email')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                    <div className={style.cell}>
                        <div>
                            <h2>Password</h2>
                            <p>**************</p>
                        </div>
                        <button onClick={() => updateField('password')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                    <div className={style.cell}>
                        <div>
                            <h2>Phone</h2>
                            <p>{customer.phone}</p>
                        </div>
                        <button onClick={() => updateField('phone')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                    <div className={style.cell}>
                        <div>
                            <h2>Country / City</h2>
                            <p>
                                {customer.country} / {customer.city}
                            </p>
                        </div>
                        <button onClick={() => updateField('countrycity')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                    <div className={style.cell}>
                        <div>
                            <h2>Address</h2>
                            <p>{customer.address}</p>
                        </div>
                        <button onClick={() => updateField('address')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                    <div className={style.cell}>
                        <div>
                            <h2>Name</h2>
                            <p>{customer.user.first_name}</p>
                        </div>
                        <button onClick={() => updateField('firstname')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                    <div className={style.cell}>
                        <div>
                            <h2>Lastname</h2>
                            <p>{customer.user.last_name}</p>
                        </div>
                        <button onClick={() => updateField('lastname')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                    <div className={style.cell}>
                        <div>
                            <h2>Birthdate ({getAge(customer.birthdate)} yo)</h2>
                            <p>{customer.birthdate}</p>
                        </div>
                        <button onClick={() => updateField('birthdate')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                    <div className={style.cell}>
                        <div>
                            <h2>Gender</h2>
                            <p>{customer.gender}</p>
                        </div>
                        <button onClick={() => updateField('gender')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                </div>
            ) : (
                <UserUpdate editing={updating} fieldUpdated={fieldUpdated} />
            )}
            <div className={style.bottom}>
                <button className={style.logout}>Log Out</button>
                <span>--- Be Careful ---</span>
                <button className={style.delete}>Delete Account</button>
            </div>
        </div>
    )
}
