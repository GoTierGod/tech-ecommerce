import style from './page.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGithub,
    faLinkedinIn,
    faTwitter
} from '@fortawesome/free-brands-svg-icons'
import { faExternalLink, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import EmailCopy from './_components/EmailCopy'

export default async function Page() {
    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.wrapperLeft}>
                    <div className={style.header}>
                        <h2>Contact Me</h2>
                    </div>
                    <div className={style.content}>
                        <p>
                            In the future you will be able to find more
                            information about me, my skills, knowledge and more
                            on my portfolio website, thanks for trying my
                            project.
                        </p>
                    </div>
                </div>
                <div className={style.wrapperRight}>
                    <div className={style.grid}>
                        <div>
                            <div className={style.header}>
                                <h2>GitHub</h2>
                                <FontAwesomeIcon icon={faGithub} />
                            </div>
                            <div className={style.content}>
                                <a
                                    href='https://github.com/GoTierGod'
                                    target='_blank'
                                >
                                    <div>
                                        <FontAwesomeIcon icon={faGithub} />
                                        <span>/ GoTierGod</span>
                                    </div>
                                    <FontAwesomeIcon icon={faExternalLink} />
                                </a>
                                <p>
                                    Feel free to follow me on GitHub, where you
                                    can explore a collection of my projects,
                                    read helpful tutorials, and stay up to date
                                    on my future projects. Get an inside look at
                                    the development process of my projects as I
                                    leverage various cutting-edge frameworks,
                                    libraries, and technologies to bring my
                                    ideas to life. I would really appreciate
                                    your presence on my GitHub profile!
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className={style.header}>
                                <h2>LinkedIn</h2>
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </div>
                            <div className={style.content}>
                                <a
                                    href='https://www.linkedin.com/in/gotiergod/'
                                    target='_blank'
                                >
                                    <div>
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                        <span>/ GoTierGod</span>
                                    </div>
                                    <FontAwesomeIcon icon={faExternalLink} />
                                </a>
                                <p>
                                    If you&apos;re looking to connect for
                                    professional inquiries, please don&apos;t
                                    hesitate to reach out to me via LinkedIn.
                                    Whether you&apos;re seeking to transform
                                    your concepts into reality or looking for a
                                    dedicated team member to help bring those
                                    ideas to life, I&apos;m excited to explore
                                    new opportunities together.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className={style.header}>
                                <h2>Twitter</h2>
                                <FontAwesomeIcon icon={faTwitter} />
                            </div>
                            <div className={style.content}>
                                <a
                                    href='https://twitter.com/GoTierGod'
                                    target='_blank'
                                >
                                    <div>
                                        <FontAwesomeIcon icon={faTwitter} />
                                        <span>/ GoTierGod</span>
                                    </div>
                                    <FontAwesomeIcon icon={faExternalLink} />
                                </a>
                                <p>
                                    If you&apos;re looking for more casual and
                                    relaxing interactions, follow me on Twitter
                                    and feel free to talk to me about anything
                                    related to programming, animals, video games
                                    or any interesting topic!
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className={style.header}>
                                <h2>Email</h2>
                                <FontAwesomeIcon icon={faMailBulk} />
                            </div>
                            <div className={style.content}>
                                <EmailCopy />
                                <p>
                                    Finally, I would like to provide you with my
                                    email address as an alternate means of
                                    contact, should it be more convenient for
                                    you to communicate with me through this
                                    channel.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
