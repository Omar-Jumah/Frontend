import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.css";

function AuthForm({ activeForm, onChangeForm }) {
    const navigate = useNavigate();
    const isLogin = activeForm === "login";

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
    };

    return (
        <form className={styles.authForm} onSubmit={handleSubmit}>
            <h2>{isLogin ? "تسجيل الدخول" : "إنشاء حساب"}</h2>

            {!isLogin && (
                <div className={styles.doubleFields}>
                    <div className={styles.field}>
                        <label>الاسم الأول</label>
                        <input type="text" placeholder="أحمد" />
                    </div>

                    <div className={styles.field}>
                        <label>اسم العائلة</label>
                        <input type="text" placeholder="محمد" />
                    </div>
                </div>
            )}

            <div className={styles.field}>
                <label>البريد الإلكتروني</label>
                <input type="email" placeholder="example@email.com" />
            </div>

            <div className={styles.field}>
                <label>كلمة المرور</label>
                <input type="password" placeholder="••••••••" />
            </div>

            <div className={styles.forgotRow}>
                <a href="#">نسيت كلمة المرور؟</a>
            </div>

            <button className={styles.mainBtn} type="submit">
                {isLogin ? "تسجيل الدخول" : "إنشاء الحساب ←"}
            </button>

            <p className={styles.switchText}>
                {isLogin ? "ليس لديك حساب؟" : "لديك حساب؟"}

                <button
                    type="button"
                    onClick={() => onChangeForm(isLogin ? "register" : "login")}
                >
                    {isLogin ? "إنشاء حساب" : "تسجيل الدخول"}
                </button>
            </p>
        </form>
    );
}

export default AuthForm;