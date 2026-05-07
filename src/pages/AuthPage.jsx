import { useState } from "react";

function AuthPage() {
  const [activeForm, setActiveForm] = useState("register");

  const isLogin = activeForm === "login";

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Left Side */}
        <section className="form-side">
          <div className="tabs">
            <button
              className={activeForm === "register" ? "tab active" : "tab"}
              type="button"
              onClick={() => setActiveForm("register")}
            >
              إنشاء حساب
            </button>

            <button
              className={activeForm === "login" ? "tab active" : "tab"}
              type="button"
              onClick={() => setActiveForm("login")}
            >
              تسجيل الدخول
            </button>
          </div>

          {isLogin ? (
            <form className="auth-form">
              <h2>تسجيل الدخول</h2>

              <div className="field">
                <label>البريد الإلكتروني</label>
                <input type="email" placeholder="example@email.com" />
              </div>

              <div className="field">
                <label>كلمة المرور</label>
                <input type="password" placeholder="••••••••" />
              </div>

              <div className="forgot-row">
                <a href="#">نسيت كلمة المرور؟</a>
              </div>

              <button className="main-btn" type="submit">
                تسجيل الدخول
              </button>

              <p className="switch-text">
                ليس لديك حساب؟
                <button type="button" onClick={() => setActiveForm("register")}>
                  إنشاء حساب
                </button>
              </p>
            </form>
          ) : (
            <form className="auth-form">
              <h2>إنشاء حساب</h2>

              <div className="double-fields">
                <div className="field">
                  <label>الاسم الأول</label>
                  <input type="text" placeholder="أحمد" />
                </div>

                <div className="field">
                  <label>اسم العائلة</label>
                  <input type="text" placeholder="محمد" />
                </div>
              </div>

              <div className="field">
                <label>البريد الإلكتروني</label>
                <input type="email" placeholder="example@email.com" />
              </div>

              <div className="field">
                <label>كلمة المرور</label>
                <input type="password" placeholder="••••••••" />
              </div>

              <div className="forgot-row">
                <a href="#">نسيت كلمة المرور؟</a>
              </div>

              <button className="main-btn" type="submit">
                إنشاء الحساب ←
              </button>

              <p className="switch-text">
                لديك حساب؟
                <button type="button" onClick={() => setActiveForm("login")}>
                  تسجيل الدخول
                </button>
              </p>
            </form>
          )}
        </section>

        {/* Right Side */}
        <section className="info-side">
          <div className="mini-brand">
            <span className="spark">✦</span>
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

          <div className="info-glow"></div>
        </section>
      </div>
    </div>
  );
}

export default AuthPage;