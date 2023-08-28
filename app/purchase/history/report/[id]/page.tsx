import style from './page.module.css'

import { getPurchase } from '@/utils/data/getPurchase'
import { getUser } from '@/utils/data/getUser'
import {
    faHandPeace,
    faScrewdriverWrench
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params

    const user = await getUser()
    if (!user)
        redirect(`/api/auth/refresh?path=/purchase/history/report/${id}&auth=1`)

    const purchase = await getPurchase(id)
    if (!purchase) redirect('')

    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.header}>
                    <h2>This is not implemented yet</h2>
                    <FontAwesomeIcon icon={faScrewdriverWrench} />
                </div>
                <div className={style.content}>
                    I will implement this feature later{' '}
                    <FontAwesomeIcon icon={faHandPeace} />
                </div>
            </div>
        </main>
    )
}
