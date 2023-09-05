import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './page.module.css'
import {
    faFigma,
    faGithub,
    faJs,
    faJsSquare,
    faPython,
    faReact
} from '@fortawesome/free-brands-svg-icons'
import { faDatabase, faExternalLink } from '@fortawesome/free-solid-svg-icons'

export default async function Page() {
    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.wrapperLeft}>
                    <div className={style.header}>
                        <h2>About</h2>
                    </div>
                    <div className={style.content}>
                        <p>
                            As you can observe, this is an e-commerce website
                            that specializes in technology products. This
                            project draws inspiration from several contemporary
                            e-commerce platforms found across the web, including
                            giants like Amazon and Mercado Libre, as well as
                            various other renowned tech brand online stores I
                            discovered while navigating the internet.
                        </p>
                    </div>
                </div>
                <div className={style.wrapperRight}>
                    <div className={style.grid}>
                        <div>
                            <div className={style.header}>
                                <h2>Front-End Repository</h2>
                                <FontAwesomeIcon icon={faGithub} />
                            </div>
                            <div className={style.content}>
                                <a
                                    href='https://github.com/GoTierGod/tech-ecommerce'
                                    target='_blank'
                                >
                                    <div>
                                        <FontAwesomeIcon icon={faGithub} />
                                        <span>/ Front-End</span>
                                    </div>
                                    <FontAwesomeIcon icon={faExternalLink} />
                                </a>
                                <p>
                                    Here&apos;s the website&apos;s front-end
                                    source code and documentation. The main
                                    technologies are Next.js 13 and TypeScript.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className={style.header}>
                                <h2>Back-End Respository</h2>
                                <FontAwesomeIcon icon={faGithub} />
                            </div>
                            <div className={style.content}>
                                <a
                                    href='https://github.com/GoTierGod/ft-drf-api'
                                    target='_blank'
                                >
                                    <div>
                                        <FontAwesomeIcon icon={faGithub} />
                                        <span>/ Back-End</span>
                                    </div>
                                    <FontAwesomeIcon icon={faExternalLink} />
                                </a>
                                <p>
                                    Here&apos;s the website&apos;s back-end API
                                    source code and documentation. The main
                                    technologies are Django and REST Framework.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
