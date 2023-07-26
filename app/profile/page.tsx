import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './page.module.css'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { getUser } from '@/helpers/getUser'
import { notFound, redirect } from 'next/navigation'
import { CustomerData } from '@/types/users'
import { formatTitleCase } from '@/helpers/formatTitleCase'

export default async function Profile() {
    const user: CustomerData = await getUser()

    if (!user) return <main>Please Log In</main>
    else
        return (
            <main>
                <div className={style.wrapper}>
                    <div className={style.top}>
                        <div className={style.topLeft}>
                            <h1>{formatTitleCase(user.user.username)}</h1>
                            <div className={style.points}>
                                <FontAwesomeIcon icon={faStar} />
                                <span>{user.points}</span>
                            </div>
                        </div>
                        <div className={style.topRight}>
                            <button className={style.edit}>Edit Profile</button>
                            <button className={style.logout}>Log Out</button>
                            <button className={style.delete}>
                                Delete Account
                            </button>
                        </div>
                    </div>
                    <div className={style.details}>
                        <div className={style.group}>
                            <div className={style.cell}>
                                <h2>Username</h2>
                                <p>{user.user.username}</p>
                            </div>
                            <div className={style.cell}>
                                <h2>Email</h2>
                                <p>{user.user.email}</p>
                            </div>
                        </div>
                        <div className={style.group}>
                            <div className={style.cell}>
                                <h2>Phone</h2>
                                <p>{user.phone}</p>
                            </div>
                            <div className={style.cell}>
                                <h2>Country</h2>
                                <p>{user.country}</p>
                            </div>
                        </div>
                        <div className={style.group}>
                            <div className={style.cell}>
                                <h2>City</h2>
                                <p>{user.city}</p>
                            </div>
                            <div className={style.cell}>
                                <h2>Address</h2>
                                <p>{user.address}</p>
                            </div>
                        </div>
                        <div className={style.group}>
                            <div className={style.cell}>
                                <h2>Name</h2>
                                <p>{user.user.first_name}</p>
                            </div>
                            <div className={style.cell}>
                                <h2>Lastname</h2>
                                <p>{user.user.last_name}</p>
                            </div>
                        </div>
                        <div className={style.group}>
                            <div className={style.cell}>
                                <h2>Birthdate</h2>
                                <p>{user.birthdate}</p>
                            </div>
                            <div className={style.cell}>
                                <h2>Gender</h2>
                                <p>{user.gender}</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.bottom}>
                        <button className={style.logout}>Log Out</button>
                        <span>--- Be Careful ---</span>
                        <button className={style.delete}>Delete Account</button>
                    </div>
                </div>
            </main>
        )
}
