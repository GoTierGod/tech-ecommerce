'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../styles/user-register.module.css'

import { useFormik } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

const fieldsTouched: string[] = [
    'username',
    'password',
    'confirmPassword',
    'email',
    'birthdate'
]

export default function UserRegister() {
    const router = useRouter()

    const Formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            birthdate: ''
        },
        onSubmit: async values => {
            const res = await fetch('/api/user/create', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })

            if (res.status === 200 || res.status === 201) {
                console.log(`${res.status} ${res.statusText}`)
                router.replace('/')
            } else console.log('Failed')
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Create a username')
                .min(8, 'At least 8 characters')
                .max(16, 'Maximum 16 characters')
                .matches(
                    /^[a-z\d]+$/i,
                    'Your username can only contain letters and numbers'
                ),
            password: Yup.string()
                .required('Create a password')
                .min(10, 'At least 10 characters')
                .max(64, 'Maximum 64 characters')
                .matches(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
                    'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
                ),
            confirmPassword: Yup.string()
                .required('Please confirm your password')
                .test(
                    'passwords-match',
                    'Passwords must match',
                    function (value) {
                        return this.parent.password === value
                    }
                ),
            email: Yup.string()
                .email()
                .required('Enter an email')
                .max(255, 'Maximum 255 characters'),
            birthdate: Yup.date()
                .required('Enter your birthdate')
                .test(
                    'age',
                    'You must be at least 18 years old',
                    function (value) {
                        const currentDate = new Date()
                        const birthdate = new Date(value)
                        const age =
                            currentDate.getFullYear() - birthdate.getFullYear()
                        const isAdult = age >= 18
                        return isAdult
                    }
                )
        })
    })

    return (
        <div className={style.wrapper}>
            <div>
                <h1>Sign Up</h1>
                <form className={style.form} onSubmit={Formik.handleSubmit}>
                    <div className={style.inputField}>
                        <label
                            htmlFor='username'
                            style={{
                                color:
                                    Object.keys(Formik.errors)[0] === 'username'
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
                                    Object.keys(Formik.errors)[0] === 'username'
                                        ? 'var(--danger)'
                                        : 'var(--gray)'
                            }}
                        />
                    </div>
                    <div className={style.inputField}>
                        <label
                            htmlFor='password'
                            style={{
                                color:
                                    Object.keys(Formik.errors)[0] === 'password'
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
                                    Object.keys(Formik.errors)[0] === 'password'
                                        ? 'var(--danger)'
                                        : 'var(--gray)'
                            }}
                        />
                    </div>
                    <div className={style.inputField}>
                        <label
                            htmlFor='confirmPassword'
                            style={{
                                color:
                                    Object.keys(Formik.errors)[0] ===
                                    'confirmPassword'
                                        ? 'var(--danger)'
                                        : 'var(--gray)'
                            }}
                        >
                            Confirm password
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            {...Formik.getFieldProps('confirmPassword')}
                            style={{
                                borderColor:
                                    Object.keys(Formik.errors)[0] ===
                                    'confirmPassword'
                                        ? 'var(--danger)'
                                        : 'var(--gray)'
                            }}
                        />
                    </div>
                    <div className={style.inputField}>
                        <label
                            htmlFor='email'
                            style={{
                                color:
                                    Object.keys(Formik.errors)[0] === 'email'
                                        ? 'var(--danger)'
                                        : 'var(--gray)'
                            }}
                        >
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            {...Formik.getFieldProps('email')}
                            style={{
                                borderColor:
                                    Object.keys(Formik.errors)[0] === 'email'
                                        ? 'var(--danger)'
                                        : 'var(--gray)'
                            }}
                        />
                    </div>
                    <div className={style.inputField}>
                        <label
                            htmlFor='birthdate'
                            style={{
                                color:
                                    Object.keys(Formik.errors)[0] ===
                                    'birthdate'
                                        ? 'var(--danger)'
                                        : 'var(--gray)'
                            }}
                        >
                            Birthdate
                        </label>
                        <input
                            type='date'
                            id='birthdate'
                            {...Formik.getFieldProps('birthdate')}
                            style={{
                                borderColor:
                                    Object.keys(Formik.errors)[0] ===
                                    'birthdate'
                                        ? 'var(--danger)'
                                        : 'var(--gray)'
                            }}
                        />
                    </div>
                    <div className={style.checking}>
                        {fieldsTouched.find(
                            field =>
                                (Formik.touched as { [key: string]: string })[
                                    field
                                ]
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
                                    {Object.values(Formik.errors)[0] as string}
                                </>
                            )
                        ) : (
                            ''
                        )}
                    </div>
                    <div className={style.options}>
                        <button type='submit'>Sign Up</button>
                        <Link href='/'>Back to Home</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
