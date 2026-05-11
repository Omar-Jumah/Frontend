import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1>محتوى متجرك،<br />احترافي عالمي،<br />بضغطة زر</h1>
                <p>وصف منتجاتك، إعلاناتك، صورك... محسنة بالذكاء الاصطناعي في ثواني.</p>
                <button className={styles.btnLarge} onClick={() => navigate('/login')}>انشاء حساب</button>
            </div>
            <div className={styles.imageWrapper}>
                <div className={styles.imageContainer}>
                    <img
                        src="/imges/Befor%20and%20After.png"
                        className={styles.heroImg}
                        alt=" Before and After"
                    />
                </div>
            </div>
        </section>
    );
};
export default Hero;