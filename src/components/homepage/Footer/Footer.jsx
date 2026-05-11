import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.contactSection}>
                        <h3 className={styles.title}>تواصل معنا</h3>
                        <div className={styles.contactList}>
                            <div className={styles.contactItem}><span></span> support@smartshop.com</div>
                            <div className={styles.contactItem}><span></span> +000 00 000 0000</div>
                            <div className={styles.contactItem}><span></span> Nablus, WestBank</div>
                        </div>
                    </div>
                    <div className={styles.socialSection}>
                        <h3 className={styles.title}>تابعنا على</h3>
                        <div className={styles.socialIcons}>
                            <a href="https://www.facebook.com/" className={styles.icon} aria-label="Facebook">
                                <img src="/imges/Facebook.png" alt="" className={styles.socialImage} />
                            </a>
                            <a href="https://www.instagram.com/" className={styles.icon} aria-label="Instagram">
                                <img src="/imges/Insta.png" alt="" className={styles.socialImage} />
                            </a>
                            <a href="https://x.com/" className={styles.icon} aria-label="X">
                                <img src="/imges/X.png" alt="" className={styles.socialImage} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.copyrights}>
                    <p> SmartShop AI © 2026</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
