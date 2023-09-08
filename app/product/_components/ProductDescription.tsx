'use client'

import { respectLineBreaks } from '@/utils/formatting/respectLineBreaks'
import style from './product-description.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

interface ProductDescriptionProps {
    description: string
}

export default function ProductDescription({
    description
}: ProductDescriptionProps) {
    const [show, setShow] = useState(false)

    return (
        <>
            <article className={style.smallDescription}>
                <header className={style.header}>
                    <h3>Description</h3>
                    <button onClick={() => setShow(prevShow => !prevShow)}>
                        {show ? 'Hide' : 'Show'}
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            style={
                                show
                                    ? { transform: 'rotateZ(180deg)' }
                                    : { transform: 'rotateZ(0deg)' }
                            }
                        />
                    </button>
                </header>
                <div
                    className={style.content}
                    style={
                        show
                            ? {
                                  maxHeight: '2000px'
                              }
                            : {
                                  maxHeight: 'calc(1.1rem + 3rem)'
                              }
                    }
                >
                    <p>{respectLineBreaks(description)}</p>
                </div>
            </article>
            <article className={style.wideDescription}>
                <header>
                    <h3>Description</h3>
                </header>
                <div>
                    <p>{respectLineBreaks(description)}</p>
                </div>
            </article>
        </>
    )
}
