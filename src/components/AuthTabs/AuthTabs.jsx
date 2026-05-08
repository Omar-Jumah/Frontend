import styles from "./AuthTabs.module.css";

function AuthTabs({ activeForm, onChangeForm }) {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${
          activeForm === "register" ? styles.active : ""
        }`}
        type="button"
        onClick={() => onChangeForm("register")}
      >
        إنشاء حساب
      </button>

      <button
        className={`${styles.tab} ${
          activeForm === "login" ? styles.active : ""
        }`}
        type="button"
        onClick={() => onChangeForm("login")}
      >
        تسجيل الدخول
      </button>
    </div>
  );
}

export default AuthTabs;