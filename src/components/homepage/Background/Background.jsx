import React from 'react';
import styles from './Background.module.css';

const Background = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.overlay}></div>
            <div className={styles.glowTop}></div>
            <div className={styles.glowRight}></div>
            <div className={styles.glowBottom}></div>
        </div>
    );
};

export default Background;