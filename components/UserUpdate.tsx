import style from '../styles/user-update.module.css'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ReactElement } from 'react'

// REQUIRED FORM FIELDS
const requiredFields: { [key: string]: object } = {
    username: { username: '' },
    email: { email: '' },
    password: { password: '' },
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
            .matches(
                /^[a-záéíóúñ\d]+$/i,
                'Your username can only contain letters and numbers'
            )
            .required('Enter your username')
    },
    email: { email: Yup.string().email().required() },
    password: {
        password: Yup.string()
            .required()
            .min(10, 'At least 10 characters')
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/),
        newPass: Yup.string()
            .required()
            .min(10, 'At least 10 characters')
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
    phone: { phone: Yup.string().required() },
    countrycity: {
        country: Yup.string().required(),
        city: Yup.string().required()
    },
    address: { address: Yup.string().required() },
    firstname: {
        firstname: Yup.string()
            .matches(
                /^[a-záéíóúñ]+$/i,
                'Your name can only contain consesutive letters'
            )
            .required('Enter your first name')
    },
    lastname: {
        lastname: Yup.string()
            .matches(
                /^[a-záéíóúñ]+$/i,
                'Your name can only contain consesutive letters'
            )
            .required('Enter your first name')
    },
    birthdate: { birthdate: Yup.date().required() },
    gender: { gender: Yup.string().required() }
}

interface UserUpdateProps {
    editing: string
    fieldUpdated: Function
}

export default function UserUpdate({ editing, fieldUpdated }: UserUpdateProps) {
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
                // DO SOMEHING ELSE
                fieldUpdated()
            }
        },
        validationSchema: Yup.object(requiredValidation[editing])
    })

    // OBJECT STORING FORM FIELDS
    const formFields: { [key: string]: ReactElement } = {
        username: (
            <div className={style.inputField}>
                <label htmlFor='username'>New Username</label>
                <input
                    type='text'
                    id='username'
                    {...Formik.getFieldProps('username')}
                />
            </div>
        ),
        email: (
            <div className={style.inputField}>
                <label htmlFor='email'>New Email</label>
                <input
                    type='email'
                    id='email'
                    {...Formik.getFieldProps('email')}
                />
            </div>
        ),
        password: (
            <>
                <div className={style.inputField}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        {...Formik.getFieldProps('password')}
                    />
                </div>
                <div className={style.inputField}>
                    <label htmlFor='newpass'>New password</label>
                    <input
                        type='newpass'
                        id='newpass'
                        {...Formik.getFieldProps('newPass')}
                    />
                </div>
                <div className={style.inputField}>
                    <label htmlFor='confirmnewpass'>Confirm new Password</label>
                    <input
                        type='confirmnewpass'
                        id='confirmnewpass'
                        {...Formik.getFieldProps('confirmNewPass')}
                    />
                </div>
            </>
        ),
        phone: (
            <div className={style.inputField}>
                <label htmlFor='phone'>New Phone</label>
                <input
                    type='text'
                    id='phone'
                    {...Formik.getFieldProps('phone')}
                />
            </div>
        ),
        countrycity: (
            <>
                <div className={style.inputField}>
                    <label htmlFor='country'>Country</label>
                    <input
                        type='text'
                        id='country'
                        {...Formik.getFieldProps('country')}
                    />
                </div>
                <div className={style.inputField}>
                    <label htmlFor='city'>City</label>
                    <input
                        type='text'
                        id='city'
                        {...Formik.getFieldProps('city')}
                    />
                </div>
            </>
        ),
        address: (
            <div className={style.inputField}>
                <label htmlFor='address'>Address</label>
                <input
                    type='text'
                    id='address'
                    {...Formik.getFieldProps('address')}
                />
            </div>
        ),
        firstname: (
            <div className={style.inputField}>
                <label htmlFor='firstname'>First Name</label>
                <input
                    type='text'
                    id='firstname'
                    {...Formik.getFieldProps('firstname')}
                />
            </div>
        ),
        lastname: (
            <div className={style.inputField}>
                <label htmlFor='lastname'>Last Name</label>
                <input
                    type='text'
                    id='lastname'
                    {...Formik.getFieldProps('lastname')}
                />
            </div>
        ),
        birthdate: (
            <div className={style.inputField}>
                <label htmlFor='birthdate'>Birthdate</label>
                <input
                    type='date'
                    id='birthdate'
                    {...Formik.getFieldProps('birthdate')}
                />
            </div>
        ),
        gender: (
            <div className={style.inputField}>
                <label htmlFor='gender'>Gender</label>
                <select id='gender' {...Formik.getFieldProps('gender')}>
                    <option value='M'>Male</option>
                    <option value='F'>Female</option>
                    <option value='O'>Other</option>
                </select>
            </div>
        )
    }

    return (
        <div className={style.wrapper}>
            <form className={style.form} onSubmit={Formik.handleSubmit}>
                {formFields[editing]}
                <div>
                    <button type='submit'>Update</button>
                    <button onClick={() => fieldUpdated()}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
