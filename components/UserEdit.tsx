import style from '../styles/user-edit.module.css'

import { FormEvent, ReactElement, useState } from 'react'

interface UserEditProps {
    editing: string
    fieldUpdated: Function
}

export default function UserEdit({ editing, fieldUpdated }: UserEditProps) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [gender, setGender] = useState('')

    const editFields: { [key: string]: ReactElement } = {
        username: (
            <div className={style.inputField}>
                <label htmlFor='username'>New Username</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
        ),
        email: (
            <div className={style.inputField}>
                <label htmlFor='email'>New Email</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
        ),
        password: (
            <div className={style.inputField}>
                <label htmlFor='password'>New Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
        ),
        phone: (
            <div className={style.inputField}>
                <label htmlFor='phone'>New Phone</label>
                <input
                    type='text'
                    name='phone'
                    id='phone'
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
            </div>
        ),
        countrycity: (
            <>
                <div className={style.inputField}>
                    <label htmlFor='country'>Country</label>
                    <input
                        type='text'
                        name='country'
                        id='country'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </div>
                <div className={style.inputField}>
                    <label htmlFor='city'>City</label>
                    <input
                        type='text'
                        name='city'
                        id='city'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </div>
            </>
        ),
        address: (
            <div className={style.inputField}>
                <label htmlFor='address'>Address</label>
                <input
                    type='text'
                    name='address'
                    id='address'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </div>
        ),
        firstname: (
            <div className={style.inputField}>
                <label htmlFor='firstname'>First Name</label>
                <input
                    type='text'
                    name='firstname'
                    id='firstname'
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                />
            </div>
        ),
        lastname: (
            <div className={style.inputField}>
                <label htmlFor='lastname'>Last Name</label>
                <input
                    type='text'
                    name='lastname'
                    id='lastname'
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                />
            </div>
        ),
        birthdate: (
            <div className={style.inputField}>
                <label htmlFor='birthdate'>Birthdate</label>
                <input
                    type='date'
                    name='birthdate'
                    id='birthdate'
                    value={birthdate}
                    onChange={e => setBirthdate(e.target.value)}
                />
            </div>
        ),
        gender: (
            <div className={style.inputField}>
                <label htmlFor='gender'>Gender</label>
                <select
                    name='gender'
                    id='gender'
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                >
                    <option value='M'>Male</option>
                    <option value='F'>Female</option>
                    <option value='O'>Other</option>
                </select>
            </div>
        )
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const username = e.currentTarget.username?.value
        const email = e.currentTarget.email?.value
        const password = e.currentTarget.password?.value
        const phone = e.currentTarget.phone?.value
        const country = e.currentTarget.country?.value
        const city = e.currentTarget.city?.value
        const address = e.currentTarget.address?.value
        const firstname = e.currentTarget.firstname?.value
        const lastname = e.currentTarget.lastname?.value
        const birthdate = e.currentTarget.birthdate?.value
        const gender = e.currentTarget.gender?.value

        const requiredFields: { [key: string]: object } = {
            username: { username: username },
            email: { email: email },
            password: { password: password },
            phone: { phone: phone },
            countrycity: { country: country, city: city },
            address: { address: address },
            firstname: { firstname: firstname },
            lastname: { lastname: lastname },
            birthdate: { birthdate: birthdate },
            gender: { gender: gender }
        }

        const res = await fetch('/api/user/update', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requiredFields[editing])
        })

        if (res.ok) {
            fieldUpdated()
        } else {
            alert('Something went wrong..')
            fieldUpdated()
        }
    }

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            {editFields[editing]}
            <div>
                <button type='submit'>Update</button>
                <button onClick={() => fieldUpdated()}>Cancel</button>
            </div>
        </form>
    )
}
