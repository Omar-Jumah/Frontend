import styles from "./Background.module.css";

function Background({ children }) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.overlay}></div>
      </div>

      {children}
    </>
  );
}

export default Background;