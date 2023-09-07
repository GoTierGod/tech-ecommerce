'use client'

import style from './email-copy.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'

export default function EmailCopy() {
    return (
        <button
            className={style.email}
            onClick={() =>
                navigator.clipboard.writeText('ivan.gunlove_10_@hotmail.com')
            }
        >
            ivan.gunlove_10_@hotmail.com
            <FontAwesomeIcon icon={faCopy} />
        </button>
    )
}
