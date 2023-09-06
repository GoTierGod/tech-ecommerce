import style from './footer.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faTwitter,
    faInstagram
} from '@fortawesome/free-brands-svg-icons'
import { faShieldAlt, faTag, faTruck } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.wrapper}>
                <section className={style.socials}>
                    <h1>Follow Us</h1>
                    <div className={style.links}>
                        <a href='https://www.facebook.com/' target='_blank'>
                            <FontAwesomeIcon icon={faFacebook} />
                            Facebook
                        </a>
                        <a href='https://twitter.com/' target='_blank'>
                            <FontAwesomeIcon icon={faTwitter} />
                            Twitter
                        </a>
                        <a href='https://www.instagram.com/' target='_blank'>
                            <FontAwesomeIcon icon={faInstagram} />
                            Instagram
                        </a>
                    </div>
                </section>
                <section className={style.info}>
                    <article>
                        <FontAwesomeIcon icon={faTag} />
                        <h2>Amazing Offers</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry.
                        </p>
                    </article>
                    <article>
                        <FontAwesomeIcon icon={faShieldAlt} />
                        <h2>Protected Purchases</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry.
                        </p>
                    </article>
                    <article>
                        <FontAwesomeIcon icon={faTruck} />
                        <h2>Fast Shipping</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry.
                        </p>
                    </article>
                </section>
            </div>
        </footer>
    )
}
