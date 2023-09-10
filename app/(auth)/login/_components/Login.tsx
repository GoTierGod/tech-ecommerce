'use client'

import style from './login.module.css'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheckCircle,
    faHandPeace,
    faXmarkCircle
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'

import ErrorDisplay from '../../../../components/ErrorDisplay'
import { APIResponse } from '@/types/response'

const fieldsTouched: string[] = [
    'username',
    'password',
    'confirmPassword',
    'email',
    'birthdate'
]

export default function Login() {
    const router = useRouter()
    const [err, setErr] = useState(
        null as null | { message: string; status: number; statusText: string }
    )

    const Formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: async values => {
            const res = await fetch(`/api/auth/login`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })

            if (res.ok) {
                router.refresh()
                router.push('/')
            } else {
                const errorResponse: APIResponse = await res.json()

                Formik.resetForm()
                setErr({
                    message: errorResponse.message,
                    status: res.status,
                    statusText: res.statusText
                })
            }
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Enter your username')
                .min(8, 'At least 8 characters')
                .max(16, 'Maximum 16 characters'),
            password: Yup.string()
                .required('Enter your password')
                .min(10, 'At least 10 characters')
                .max(32, 'Maximum 32 characters')
        })
    })

    const ErrorReset = () => setErr(null)

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
                        <h1>Log In</h1>
                        <form
                            className={style.form}
                            onSubmit={Formik.handleSubmit}
                        >
                            <div className={style.formField}>
                                <label
                                    htmlFor='username'
                                    style={{
                                        color:
                                            Object.keys(Formik.errors)[0] ===
                                            'username'
                                                ? 'var(--danger)'
                                                : 'var(--gray)'
                                    }}
                                >
                                    Username
                                </label>
                                <input
                                    type='text'
                                    id='username'
                                    {...Formik.getFieldProps('username')}
                                    style={{
                                        borderColor:
                                            Object.keys(Formik.errors)[0] ===
                                            'username'
                                                ? 'var(--danger)'
                                                : 'var(--gray)'
                                    }}
                                />
                            </div>
                            <div className={style.formField}>
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
                                    Password
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
                                    <>
                                        <FontAwesomeIcon icon={faHandPeace} />
                                        <span>Welcome back!</span>
                                    </>
                                )}
                            </div>
                            <div className={style.options}>
                                <button type='submit'>Log In</button>
                                <Link href='/'>Back to Home</Link>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <ErrorDisplay
                    {...err}
                    action={ErrorReset}
                    actionText='Try again'
                />
            )}
        </main>
    )
}
