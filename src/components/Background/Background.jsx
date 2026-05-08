import styles from "./Background.module.css";

function Background({ children }) {
  return (
    <div className={styles.appBackground}>
      <div className={`${styles.backgroundGlow} ${styles.glowOne}`}></div>
      <div className={`${styles.backgroundGlow} ${styles.glowTwo}`}></div>
      <div className={`${styles.backgroundGlow} ${styles.glowThree}`}></div>

      {children}
    </div>
  );
}

export default Background;