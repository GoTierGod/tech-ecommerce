'use client'

import style from '../styles/user-delete.module.css'

import Link from 'next/link'
import { Customer } from '@/types/users'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

const fieldsTouched: string[] = ['password', 'username']

interface UserDeleteProps {
    customer: Customer
}

export default function UserDelete({ customer }: UserDeleteProps) {
    const Formik = useFormik({
        initialValues: {
            password: '',
            consent: ''
        },
        onSubmit: async values => {
            console.log(JSON.stringify(values))
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Password is a required field')
                .min(10, 'At least 10 characters')
                .max(32, 'Maximum 32 characters'),
            consent: Yup.string()
                .required('Confirm account deletion')
                .equals(
                    [`Delete ${customer.user.username}`],
                    `The entered text does not match`
                )
        })
    })

    return (
        <main>
            <div className={style.wrapper}>
                <div>
                    <h1>{customer.user.username}</h1>
                    <div className={style.feedback}>
                        <h2>Are you sure you want to delete your account?</h2>
                        <p>
                            Deleting your account on our website is a
                            significant step, and we want to remind you that it
                            is irreversible. By confirming the deletion, all
                            your account information, including order history,
                            saved addresses, and payment details, will be
                            permanently removed from our system.
                        </p>
                        <p>
                            Once your account is deleted, you will no longer
                            have access to your purchase history, and any
                            existing rewards, points, or ongoing promotions
                            linked to your account will be lost. Moreover, you
                            will need to create a new account if you wish to
                            shop with us again in the future.
                        </p>
                    </div>
                    <form className={style.form} onSubmit={Formik.handleSubmit}>
                        <div className={style.inputField}>
                            <label
                                htmlFor='password'
                                style={{
                                    color:
                                        Object.keys(Formik.errors)[0] ===
                                        'password'
                                            ? 'var(--danger)'
                                            : 'var(--gray)'
                                }}
                            >
                                Enter your password
                            </label>
                            <input
                                type='password'
                                id='password'
                                {...Formik.getFieldProps('password')}
                                style={{
                                    borderColor:
                                        Object.keys(Formik.errors)[0] ===
                                        'password'
                                            ? 'var(--danger)'
                                            : 'var(--gray)'
                                }}
                            />
                        </div>
                        <div className={style.inputField}>
                            <label
                                htmlFor='consent'
                                style={{
                                    color:
                                        Object.keys(Formik.errors)[0] ===
                                        'consent'
                                            ? 'var(--danger)'
                                            : 'var(--gray)'
                                }}
                            >
                                Enter &quot;
                                <span>
                                    {`Delete ${customer.user.username}`}
                                </span>
                                &quot;
                            </label>
                            <input
                                type='text'
                                id='consent'
                                {...Formik.getFieldProps('consent')}
                                style={{
                                    borderColor:
                                        Object.keys(Formik.errors)[0] ===
                                        'consent'
                                            ? 'var(--danger)'
                                            : 'var(--gray)'
                                }}
                            />
                        </div>
                        <div className={style.checking}>
                            {fieldsTouched.find(
                                field =>
                                    (
                                        Formik.touched as {
                                            [key: string]: string
                                        }
                                    )[field]
                            ) ? (
                                Formik.isValid ? (
                                    <>
                                        <FontAwesomeIcon
                                            icon={faCheckCircle}
                                            color='var(--main)'
                                        />
                                        {'Everything OK!'}
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon
                                            icon={faXmarkCircle}
                                            color='var(--danger)'
                                        />
                                        {
                                            Object.values(
                                                Formik.errors
                                            )[0] as string
                                        }
                                    </>
                                )
                            ) : (
                                ''
                            )}
                        </div>
                        <div className={style.options}>
                            <button className={style.deleteBtn} type='submit'>
                                Delete Account
                            </button>
                            <Link href='/profile'>Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
