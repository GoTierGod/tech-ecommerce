import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './not-implemented.module.css'
import {
    faHandPeace,
    faScrewdriverWrench
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Breadcrumbs from './Breadcrumbs'

export default function NotImplemented() {
    return (
        <main>
            <Breadcrumbs routeList={[{ path: '', name: '. . .' }]} />
            <div className={style.wrapper}>
                <div className={style.header}>
                    <h2>This is not implemented yet</h2>
                    <FontAwesomeIcon icon={faScrewdriverWrench} />
                </div>
                <div className={style.content}>
                    <div>
                        <span>I may implement this feature later</span>
                        <FontAwesomeIcon icon={faHandPeace} />
                    </div>
                    <p>
                        If you have any intriguing ideas to enhance the project,
                        please don&apos;t hesitate to reach out to me using one
                        of the contact methods I&apos;ve made available on the{' '}
                        <Link href='/contact' prefetch={false}>
                            contact page
                        </Link>
                        . Thank you for your interest in trying out my project.
                    </p>
                </div>
            </div>
        </main>
    )
}
