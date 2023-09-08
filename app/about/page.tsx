import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './page.module.css'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import Breadcrumbs from '@/components/Breadcrumbs'

export default async function Page() {
    return (
        <main>
            <Breadcrumbs routeList={[{ path: '/about', name: 'About' }]} />
            <div className={style.wrapper}>
                <section className={style.wrapperLeft}>
                    <header className={style.header}>
                        <h2>About</h2>
                    </header>
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
                </section>
                <section className={style.wrapperRight}>
                    <div className={style.grid}>
                        <article>
                            <header className={style.header}>
                                <h2>Front-End Repository</h2>
                                <FontAwesomeIcon icon={faGithub} />
                            </header>
                            <div className={style.content}>
                                <a
                                    href='https://github.com/GoTierGod/tech-ecommerce'
                                    target='_blank'
                                >
                                    <span>
                                        <FontAwesomeIcon icon={faGithub} />
                                        <span>/ Front-End</span>
                                    </span>
                                    <FontAwesomeIcon icon={faExternalLink} />
                                </a>
                                <p>
                                    Here&apos;s the website&apos;s front-end
                                    source code and documentation. The main
                                    technologies are Next.js 13 and TypeScript.
                                </p>
                            </div>
                        </article>
                        <article>
                            <header className={style.header}>
                                <h2>Back-End Respository</h2>
                                <FontAwesomeIcon icon={faGithub} />
                            </header>
                            <div className={style.content}>
                                <a
                                    href='https://github.com/GoTierGod/ft-drf-api'
                                    target='_blank'
                                >
                                    <span>
                                        <FontAwesomeIcon icon={faGithub} />
                                        <span>/ Back-End</span>
                                    </span>
                                    <FontAwesomeIcon icon={faExternalLink} />
                                </a>
                                <p>
                                    Here&apos;s the website&apos;s back-end API
                                    source code and documentation. The main
                                    technologies are Django and REST Framework.
                                </p>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </main>
    )
}
