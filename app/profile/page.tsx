import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './page.module.css'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { getUser } from '@/helpers/getUser'
import { redirect } from 'next/navigation'
import { CustomerData } from '@/types/users'

export default async function Profile() {
    const user: CustomerData = await getUser()

    if (!user) redirect('/login')

    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.top}>
                    <h1>{'Iván Zamorano'}</h1>
                    <div className={style.points}>
                        <FontAwesomeIcon icon={faStar} />
                        <span>1657</span>
                    </div>
                </div>
                <div className={style.details}>
                    <div className={style.group}></div>
                </div>
            </div>
        </main>
    )
}
