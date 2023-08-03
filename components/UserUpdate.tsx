import style from '../styles/user-update.module.css'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ReactElement, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { APIResponse } from '@/app/api/auth/login/route'

// FIELDS TO VERIFY IF THEY WERE TOUCHED
const fieldsTouched: { [key: string]: string[] } = {
    username: ['username'],
    email: ['password', 'email'],
    password: ['password', 'newPass', 'confirmNewPass'],
    phone: ['phone'],
    countrycity: ['country', 'city'],
    address: ['address'],
    firstname: ['firstname'],
    lastname: ['lastname'],
    birthdate: ['birthdate'],
    gender: ['gender']
}

// REQUIRED FORM FIELDS
const requiredFields: { [key: string]: { [key: string]: any } } = {
    username: { username: '' },
    email: { password: '', email: '' },
    password: { password: '', newPass: '', confirmNewPass: '' },
    phone: { phone: '' },
    countrycity: { country: '', city: '' },
    address: { address: '' },
    firstname: { firstname: '' },
    lastname: { lastname: '' },
    birthdate: { birthdate: '' },
    gender: { gender: '' }
}

// REQUIRED FORM VALIDATION
const requiredValidation: { [key: string]: any } = {
    username: {
        username: Yup.string()
            .required('Enter your username')
            .min(8, 'At least 8 characters')
            .max(16, 'Maximum 16 characters')
            .matches(
                /^[a-z\d]+$/i,
                'Your username can only contain letters and numbers'
            )
    },
    email: {
        password: Yup.string().required('Enter your password'),
        email: Yup.string()
            .email()
            .required('Enter a new email')
            .max(255, 'Maximum 255 characters')
    },
    password: {
        password: Yup.string().required('Enter your current password'),
        newPass: Yup.string()
            .required('Enter a new password')
            .min(10, 'At least 10 characters')
            .max(64, 'Maximum 64 characters')
            .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
            ),
        confirmNewPass: Yup.string()
            .required('Please confirm your password')
            .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.newPass === value
            })
    },
    phone: { phone: Yup.string().required('Enter a new phone number') },
    countrycity: {
        country: Yup.string()
            .required('Enter a new country')
            .max(255, 'Maximum 255 characters'),
        city: Yup.string()
            .required('Enter a new city')
            .max(255, 'Maximum 255 characters')
    },
    address: {
        address: Yup.string()
            .required('Enter a new address')
            .max(255, 'Maximum 255 characters')
    },
    firstname: {
        firstname: Yup.string()
            .matches(
                /^[a-záéíóúñ]+$/i,
                'Your name can only contain consesutive letters'
            )
            .required('Enter your first name')
            .max(255, 'Maximum 255 characters')
    },
    lastname: {
        lastname: Yup.string()
            .matches(
                /^[a-záéíóúñ]+$/i,
                'Your name can only contain consesutive letters'
            )
            .required('Enter your last name')
            .max(255, 'Maximum 255 characters')
    },
    birthdate: {
        birthdate: Yup.date()
            .required('Enter your birthdate')
            .test('age', 'You must be at least 18 years old', function (value) {
                const currentDate = new Date()
                const birthdate = new Date(value)
                const age = currentDate.getFullYear() - birthdate.getFullYear()
                const isAdult = age >= 18
                return isAdult
            })
    },
    gender: { gender: Yup.string().required('Select your gender') }
}

interface UserUpdateProps {
    editing: string
    fieldUpdated: Function
    setErr: Function
}

export default function UserUpdate({
    editing,
    fieldUpdated,
    setErr
}: UserUpdateProps) {
    // FORM VALIDATION
    const Formik = useFormik({
        initialValues: requiredFields[editing],
        onSubmit: async values => {
            const res = await fetch('/api/user/update', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })

            if (res.ok) {
                // DO SOMETHING
                fieldUpdated()
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
        validationSchema: Yup.object(requiredValidation[editing])
    })

    // OBJECT STORING FORM FIELDS
    const formFields: { [key: string]: ReactElement } = {
        username: (
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
                    New Username
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
        ),
        email: (
            <>
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
                        htmlFor='email'
                        style={{
                            color:
                                Object.keys(Formik.errors)[0] === 'email'
                                    ? 'var(--danger)'
                                    : 'var(--gray)'
                        }}
                    >
                        New Email
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
            </>
        ),
        password: (
            <>
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
                        htmlFor='newpass'
                        style={{
                            color:
                                Object.keys(Formik.errors)[0] === 'newPass'
                                    ? 'var(--danger)'
                                    : 'var(--gray)'
                        }}
                    >
                        New password
                    </label>
                    <input
                        type='password'
                        id='newpass'
                        {...Formik.getFieldProps('newPass')}
                        style={{
                            borderColor:
                                Object.keys(Formik.errors)[0] === 'newPass'
                                    ? 'var(--danger)'
                                    : 'var(--gray)'
                        }}
                    />
                </div>
                <div className={style.inputField}>
                    <label
                        htmlFor='confirmnewpass'
                        style={{
                            color:
                                Object.keys(Formik.errors)[0] ===
                                'confirmNewPass'
                                    ? 'var(--danger)'
                                    : 'var(--gray)'
                        }}
                    >
                        Confirm new Password
                    </label>
                    <input
                        type='password'
                        id='confirmnewpass'
                        {...Formik.getFieldProps('confirmNewPass')}
                        style={{
                            borderColor:
                                Object.keys(Formik.errors)[0] ===
                                'confirmNewPass'
                                    ? 'var(--danger)'
                                    : 'var(--gray)'
                        }}
                    />
                </div>
            </>
        ),
        phone: (
            <div className={style.inputField}>
                <label
                    htmlFor='phone'
                    style={{
                        color:
                            Object.keys(Formik.errors)[0] === 'phone'
                                ? 'var(--danger)'
                                : 'var(--gray)'
                    }}
                >
                    New Phone
                </label>
                <input
                    type='text'
                    id='phone'
                    {...Formik.getFieldProps('phone')}
                    style={{
                        borderColor:
                            Object.keys(Formik.errors)[0] === 'phone'
                                ? 'var(--danger)'
                                : 'var(--gray)'
                    }}
                />
            </div>
        ),
        countrycity: (
            <>
                <div className={style.inputField}>
                    <label
                        htmlFor='country'
                        style={{
                            color:
                                Object.keys(Formik.errors)[0] === 'country'
                                    ? 'var(--danger)'
                                    : 'var(--gray)'
                        }}
                    >
                        Country
                    </label>
                    <input
                        type='text'
                        id='country'
                        {...Formik.getFieldProps('country')}
                        style={{
                            borderColor:
                                Object.keys(Formik.errors)[0] === 'country'
                                    ? 'var(--danger)'
                                    : 'var(--gray)'
                        }}
                    />
                </div>
                <div className={style.inputField}>
                    <label
                        htmlFor='city'
                        style={{
                            color:
                                Object.keys(Formik.errors)[0] === 'city'
                                    ? 'var(--danger)'
                                    : 'var(--gray)'
                        }}
                    >
                        City
                    </label>
                    <input
                        type='text'
                        id='city'
                        {...Formik.getFieldProps('city')}
                        style={{
                            borderColor:
                                Object.keys(Formik.errors)[0] === 'city'
                                    ? 'var(--danger)'
                                    : 'var(--gray)'
                        }}
                    />
                </div>
            </>
        ),
        address: (
            <div className={style.inputField}>
                <label
                    htmlFor='address'
                    style={{
                        color:
                            Object.keys(Formik.errors)[0] === 'address'
                                ? 'var(--danger)'
                                : 'var(--gray)'
                    }}
                >
                    Address
                </label>
                <input
                    type='text'
                    id='address'
                    {...Formik.getFieldProps('address')}
                    style={{
                        borderColor:
                            Object.keys(Formik.errors)[0] === 'address'
                                ? 'var(--danger)'
                                : 'var(--gray)'
                    }}
                />
            </div>
        ),
        firstname: (
            <div className={style.inputField}>
                <label
                    htmlFor='firstname'
                    style={{
                        color:
                            Object.keys(Formik.errors)[0] === 'firstname'
                                ? 'var(--danger)'
                                : 'var(--gray)'
                    }}
                >
                    First Name
                </label>
                <input
                    type='text'
                    id='firstname'
                    {...Formik.getFieldProps('firstname')}
                    style={{
                        borderColor:
                            Object.keys(Formik.errors)[0] === 'firstname'
                                ? 'var(--danger)'
                                : 'var(--gray)'
                    }}
                />
            </div>
        ),
        lastname: (
            <div className={style.inputField}>
                <label
                    htmlFor='lastname'
                    style={{
                        color:
                            Object.keys(Formik.errors)[0] === 'lastname'
                                ? 'var(--danger)'
                                : 'var(--gray)'
                    }}
                >
                    Last Name
                </label>
                <input
                    type='text'
                    id='lastname'
                    {...Formik.getFieldProps('lastname')}
                    style={{
                        borderColor:
                            Object.keys(Formik.errors)[0] === 'lastname'
                                ? 'var(--danger)'
                                : 'var(--gray)'
                    }}
                />
            </div>
        ),
        birthdate: (
            <div className={style.inputField}>
                <label
                    htmlFor='birthdate'
                    style={{
                        color:
                            Object.keys(Formik.errors)[0] === 'birthdate'
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
                            Object.keys(Formik.errors)[0] === 'birthdate'
                                ? 'var(--danger)'
                                : 'var(--gray)'
                    }}
                />
            </div>
        ),
        gender: (
            <div className={style.inputField}>
                <label
                    htmlFor='gender'
                    style={{
                        color:
                            Object.keys(Formik.errors)[0] === 'gender'
                                ? 'var(--danger)'
                                : 'var(--gray)'
                    }}
                >
                    Gender
                </label>
                <select
                    id='gender'
                    {...Formik.getFieldProps('gender')}
                    style={{
                        outlineColor:
                            Object.keys(Formik.errors)[0] === 'password'
                                ? 'var(--danger)'
                                : 'var(--gray)'
                    }}
                >
                    <option value='M' defaultChecked>
                        Male
                    </option>
                    <option value='F'>Female</option>
                    <option value='O'>Other</option>
                </select>
            </div>
        )
    }

    useEffect(() => console.log(Formik.errors), [Formik.errors])

    return (
        <div className={style.wrapper}>
            <form className={style.form} onSubmit={Formik.handleSubmit}>
                {formFields[editing]}
                <div className={style.checking}>
                    {fieldsTouched[editing].find(
                        field => Formik.touched[field]
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
                <div>
                    <button type='submit'>Update</button>
                    <button onClick={() => fieldUpdated()}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
