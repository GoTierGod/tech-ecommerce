import style from './user-update.module.css'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ReactElement, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheckCircle,
    faUserPen,
    faXmarkCircle
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

import { Customer } from '@/types/users'
import { APIResponse } from '@/types/response'

interface UserUpdateProps {
    updating: string
    fieldUpdated: Function
    setErr: Function
    customer: Customer
    customerInfoKeys: { [key: string]: string }
    customerInfoValues: { [key: string]: string }
}

export default function UserUpdate({
    updating,
    fieldUpdated,
    setErr,
    customer,
    customerInfoKeys,
    customerInfoValues
}: UserUpdateProps) {
    const router = useRouter()
    const [waitingRes, setWaitingRes] = useState(false)

    const requiredFieldsName: { [key: string]: string[] } = useMemo(
        () => ({
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
        }),
        []
    )

    const requiredFieldsInitialValue: {
        [key: string]: { [key: string]: any }
    } = useMemo(
        () => ({
            username: { username: '' },
            email: { password: '', email: '' },
            password: { password: '', newPass: '', confirmNewPass: '' },
            phone: { phone: '' },
            countrycity: { country: '', city: '' },
            address: { address: '' },
            firstname: { firstname: '' },
            lastname: { lastname: '' },
            birthdate: { birthdate: customer.birthdate },
            gender: { gender: customer.gender }
        }),
        [customer.birthdate, customer.gender]
    )

    const requiredValidation: { [key: string]: any } = useMemo(
        () => ({
            username: {
                username: Yup.string()
                    .required('Enter a new username')
                    .min(8, 'At least 8 characters')
                    .max(16, 'Maximum 16 characters')
                    .matches(
                        /^[a-z\d]+$/i,
                        'Your username can only contain letters and numbers'
                    )
                    .not(
                        [customer.user.username],
                        'Username must be different from your current username'
                    )
            },
            email: {
                password: Yup.string().required('Enter your password'),
                email: Yup.string()
                    .email('Enter a valid email')
                    .required('Enter a new email')
                    .max(255, 'Maximum 255 characters')
                    .not(
                        [customer.user.email],
                        'Email must be different from your current email'
                    )
            },
            password: {
                password: Yup.string().required('Enter your current password'),
                newPass: Yup.string()
                    .required('Enter a new password')
                    .min(10, 'At least 10 characters')
                    .max(32, 'Maximum 32 characters')
                    .matches(
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
                        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
                    ),
                confirmNewPass: Yup.string()
                    .required('Please confirm your password')
                    .test(
                        'passwords-match',
                        'Passwords must match',
                        function (value) {
                            return this.parent.newPass === value
                        }
                    )
            },
            phone: {
                phone: Yup.string()
                    .required('Enter a new phone number')
                    .not(
                        [customer.phone],
                        'Phone must be different from your current phone'
                    )
            },
            countrycity: {
                country: Yup.string()
                    .required('Enter a new country')
                    .max(255, 'Maximum 255 characters')
                    .not(
                        [customer.country],
                        'Country must be different from your current country'
                    ),
                city: Yup.string()
                    .required('Enter a new city')
                    .max(255, 'Maximum 255 characters')
                    .not(
                        [customer.city],
                        'City must be different from your current city'
                    )
            },
            address: {
                address: Yup.string()
                    .required('Enter a new address')
                    .max(255, 'Maximum 255 characters')
                    .not(
                        [customer.address],
                        'Address must be different from your current address'
                    )
            },
            firstname: {
                firstname: Yup.string()
                    .matches(
                        /^[a-záéíóúñ]+$/i,
                        'Your name can only contain consesutive letters'
                    )
                    .required('Enter your first name')
                    .max(255, 'Maximum 255 characters')
                    .not(
                        [customer.user.first_name],
                        'Name must be different from your current name'
                    )
            },
            lastname: {
                lastname: Yup.string()
                    .matches(
                        /^[a-záéíóúñ]+$/i,
                        'Your name can only contain consesutive letters'
                    )
                    .required('Enter your last name')
                    .max(255, 'Maximum 255 characters')
                    .not(
                        [customer.user.last_name],
                        'Last name must be different from your current last name'
                    )
            },
            birthdate: {
                birthdate: Yup.date()
                    .required('Enter your birthdate')
                    .test(
                        'age',
                        'You must be at least 18 years old',
                        function (value) {
                            const currentDate = new Date()
                            const birthdate = new Date(value)
                            const age =
                                currentDate.getFullYear() -
                                birthdate.getFullYear()
                            const isAdult = age >= 18
                            return isAdult
                        }
                    )
                    .test(
                        'not-same-as-current',
                        'Birthdate must be different from your current birthdate',
                        function (value) {
                            const currentBirthdate = new Date(
                                customer.birthdate
                            )
                            const newBirthdate = new Date(value)

                            return (
                                currentBirthdate.toISOString().slice(0, 10) !==
                                newBirthdate.toISOString().slice(0, 10)
                            )
                        }
                    )
            },
            gender: {
                gender: Yup.string()
                    .required('Select your gender')
                    .not(
                        [customer.gender],
                        'Gender must be different from your current gender'
                    )
            }
        }),
        [customer]
    )

    const Formik = useFormik({
        initialValues: requiredFieldsInitialValue[updating],
        onSubmit: async values => {
            if (!waitingRes) {
                setWaitingRes(true)

                const res = await fetch('/api/customer/update', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values)
                })

                if (res.ok) {
                    router.refresh()
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

                setWaitingRes(false)
            }
        },
        validationSchema: Yup.object(requiredValidation[updating])
    })

    const requiredFormElements: { [key: string]: ReactElement } = useMemo(
        () => ({
            username: (
                <div className={style.formField}>
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
                    <div className={style.formField}>
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
                    <div className={style.formField}>
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
                    <div className={style.formField}>
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
                    <div className={style.formField}>
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
                    <div className={style.formField}>
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
                <div className={style.formField}>
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
                    <div className={style.formField}>
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
                    <div className={style.formField}>
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
                <div className={style.formField}>
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
                <div className={style.formField}>
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
                <div className={style.formField}>
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
                <div className={style.formField}>
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
                <div className={style.formField}>
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
        }),
        [Formik]
    )

    return (
        <div className={style.wrapper}>
            <form className={style.form} onSubmit={Formik.handleSubmit}>
                {requiredFormElements[updating]}
                <div className={style.checking}>
                    {requiredFieldsName[updating].find(
                        field => Formik.touched[field]
                    ) ? (
                        Formik.isValid ? (
                            <>
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    color='var(--main)'
                                />
                                <span>{'Everything OK!'}</span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon
                                    icon={faXmarkCircle}
                                    color='var(--danger)'
                                />
                                <span>
                                    {Object.values(Formik.errors)[0] as string}
                                </span>
                            </>
                        )
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faUserPen} />
                            <span>
                                Updating{' '}
                                {customerInfoKeys[updating].toLocaleLowerCase()}{' '}
                                &quot;
                                <span>{customerInfoValues[updating]}</span>
                                &quot;
                            </span>
                        </>
                    )}
                </div>
                <div>
                    <button type='submit' disabled={waitingRes}>
                        Update
                    </button>
                    <button onClick={() => fieldUpdated()}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
