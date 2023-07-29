'use client'

import style from '../styles/user-register.module.css'

import { useFormik } from 'formik'
import Link from 'next/link'
import * as Yup from 'yup'

export default function UserRegister() {
    const Formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthdate: ''
        },
        onSubmit: async values => {
            console.log(JSON.stringify(values))
        },
        validationSchema: Yup.object({
            username: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
            confirmPassword: Yup.string().required(),
            birthdate: Yup.date().required()
        })
    })

    return (
        <div className={style.wrapper}>
            <div>
                <h1>Sign Up</h1>
                <form className={style.form} onSubmit={Formik.handleSubmit}>
                    <div className={style.inputField}>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            {...Formik.getFieldProps('username')}
                        />
                    </div>
                    <div className={style.inputField}>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            {...Formik.getFieldProps('password')}
                        />
                    </div>
                    <div className={style.inputField}>
                        <label htmlFor='confirmPassword'>
                            Confirm password
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            {...Formik.getFieldProps('confirmPassword')}
                        />
                    </div>
                    <div className={style.inputField}>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            {...Formik.getFieldProps('email')}
                        />
                    </div>
                    <div className={style.inputField}>
                        <label htmlFor='birthdate'>Birthdate</label>
                        <input
                            type='date'
                            id='birthdate'
                            {...Formik.getFieldProps('birthdate')}
                        />
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
