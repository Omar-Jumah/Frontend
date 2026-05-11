import styles from "./InfoPanel.module.css";

function InfoPanel() {
    return (
        <section className={styles.infoSide}>
            <div className={styles.miniBrand}>
                <span className={styles.spark}>✦</span>
                <span>SmartShop AI</span>
            </div>

            <h1>
                وفّر ساعات من
                <br />
                التسويق اليومي
            </h1>

            <p>
                انضم للناس اللي يستخدموا الذكاء الاصطناعي عشان يسووا أكثر
                <br />
                بوقت أقل
            </p>

            <ul>
                <li>
                    <span>✓</span>
                    صمّم متجرك في أقل من 10 ثواني
                </li>
                <li>
                    <span>✓</span>
                    إعلانات جاهزة للسوشال ميديا
                </li>
                <li>
                    <span>✓</span>
                    إزالة خلفية الصور تلقائيًا
                </li>
                <li>
                    <span>✓</span>
                    مجاني تمامًا للبدء
                </li>
            </ul>

            <div className={styles.infoGlow}></div>
        </section>
    );
}

export default InfoPanel;