'use client'

import style from './user-delete.module.css'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import ErrorDisplay from '../../../../components/ErrorDisplay'
import { APIResponse } from '@/types/response'
import { ComposedCustomerData } from '@/types/customer'

const fieldsTouched: string[] = ['password', 'username']

interface UserDeleteProps {
    customer: ComposedCustomerData
}

export default function UserDelete({ customer }: UserDeleteProps) {
    const router = useRouter()
    const [waitingRes, setWaitingRes] = useState(false)
    const [err, setErr] = useState(
        null as null | { message: string; status: number; statusText: string }
    )

    const Formik = useFormik({
        initialValues: {
            password: '',
            consent: ''
        },
        onSubmit: async values => {
            if (!waitingRes) {
                setWaitingRes(true)

                const res = await fetch('/api/customer/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password: values.password })
                })

                if (res.ok) {
                    router.replace('/')
                } else {
                    const errorResponse: APIResponse = await res.json()

                    Formik.resetForm()
                    setErr({
                        message:
                            errorResponse?.message ||
                            errorResponse?.detail ||
                            'Something went wrong',
                        status: res.status,
                        statusText: res.statusText
                    })
                }

                setWaitingRes(false)
            }
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Password is a required field')
                .min(10, 'At least 10 characters')
                .max(32, 'Maximum 32 characters'),
            consent: Yup.string()
                .required('Confirm account deletion')
                .equals(
                    [`Delete ${customer.username}`],
                    `The entered text does not match`
                )
        })
    })

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
                <div className={style.wrapper}>
                    <div>
                        <h1>{customer.username}</h1>
                        <div className={style.feedback}>
                            <h2>
                                Are you sure you want to delete your account?
                            </h2>
                            <p>
                                Deleting your account on our website is a
                                significant step, and we want to remind you that
                                it is irreversible. By confirming the deletion,
                                all your account information, including order
                                history, saved addresses, and payment details,
                                will be permanently removed from our system.
                            </p>
                            <p>
                                Once your account is deleted, you will no longer
                                have access to your purchase history, and any
                                existing rewards, points, or ongoing promotions
                                linked to your account will be lost. Moreover,
                                you will need to create a new account if you
                                wish to shop with us again in the future.
                            </p>
                        </div>
                        <form
                            className={style.form}
                            onSubmit={Formik.handleSubmit}
                        >
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
                                    <span>{`Delete ${customer.username}`}</span>
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
                                <button
                                    className={style.deleteBtn}
                                    type='submit'
                                    disabled={waitingRes}
                                >
                                    Delete Account
                                </button>
                                <Link href='/profile' prefetch={false}>
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
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
