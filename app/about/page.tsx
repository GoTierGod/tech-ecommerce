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
                                <p>
                                    Here&apos;s the website&apos;s front-end
                                    source code and documentation. The main
                                    technologies are Next.js 13 and TypeScript.
                                </p>
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
                            </div>
                        </div>
                        <div>
                            <div className={style.header}>
                                <h2>Back-End Respository</h2>
                                <FontAwesomeIcon icon={faGithub} />
                            </div>
                            <div className={style.content}>
                                <p>
                                    Here&apos;s the website&apos;s back-end API
                                    source code and documentation. The main
                                    technologies are Django REST Framework and
                                    Python.
                                </p>
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
                            </div>
                        </div>
                        <div>
                            <div className={style.header}>
                                <h2>Design</h2>
                                <FontAwesomeIcon icon={faFigma} />
                            </div>
                            <div className={style.content}>
                                <p>
                                    I took the initiative to create the entire
                                    project design myself, despite not being a
                                    professional designer. As I pursue a career
                                    in web development, I&apos;ve also acquired
                                    fundamental expertise in UI/UX and
                                    accessibility. My goal was an original
                                    design while prioritizing simplicity, making
                                    it visually pleasing, easy to comprehend,
                                    and having a high learnability.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className={style.header}>
                                <h2>Front-End</h2>
                                <FontAwesomeIcon icon={faJsSquare} />
                            </div>
                            <div className={style.content}>
                                <p>
                                    I opted for Next.js as the front-end
                                    framework for my project, leveraging its
                                    strong ties to React. This choice was
                                    primarily driven by its remarkable SEO and a
                                    range of enticing features ideals for
                                    e-commerce websites, such as image
                                    optimization, caching, and more. Thanks to
                                    these features, I was able to create a
                                    blazing-fast website, even in locations
                                    where a substantial volume of images is
                                    involved.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className={style.header}>
                                <h2>Back-End</h2>
                                <FontAwesomeIcon icon={faPython} />
                            </div>
                            <div className={style.content}>
                                <p>
                                    Choosing the right framework for building
                                    the website&apos;s back-end API was a
                                    challenging decision. I had several
                                    excellent options to consider, but after
                                    careful deliberation, I ultimately selected
                                    Django, supported by the Django REST
                                    Framework (DRF). I can confidently say that
                                    I do not regret my decision. Django,
                                    combined with DRF, made the process of
                                    creating the API, implementing
                                    authentication, and connecting Django to my
                                    database remarkably straightforward. The
                                    features offered by DRF significantly
                                    enhanced the efficiency of my work.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className={style.header}>
                                <h2>Database</h2>
                                <FontAwesomeIcon icon={faDatabase} />
                            </div>
                            <div className={style.content}>
                                <p>
                                    I chose Supabase&apos;s PostgreSQL for my
                                    database solution. While there are several
                                    excellent alternatives available, my
                                    decision was influenced by the circumstances
                                    at the time. Railway had eliminated its free
                                    tier, and Vercel&apos;s database services
                                    were still in Beta. Therefore, Supabase
                                    emerged as the most suitable choice. Its
                                    exceptional speed and the ample capabilities
                                    of its free tier align perfectly with the
                                    requirements of my project.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
