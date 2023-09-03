import style from './footer.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faTwitter,
    faInstagram
} from '@fortawesome/free-brands-svg-icons'
import {
    faMoneyBill,
    faShieldAlt,
    faBoxOpen
} from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.wrapper}>
                <div className={style.socials}>
                    <h2>Follow Us</h2>
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
                </div>
                <div className={style.info}>
                    <div>
                        <FontAwesomeIcon icon={faMoneyBill} />
                        <h2>Free Shipping</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry.
                        </p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faShieldAlt} />
                        <h2>Protected Purchases</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry.
                        </p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBoxOpen} />
                        <h2>Fast Shipping</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
