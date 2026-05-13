import styles from "./Settings.module.css";
import { Link } from "react-router-dom";

function Settings() {
  return (
    <div className={styles.page} dir="rtl">
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <span>SmartShop AI</span>
            <h1>الإعدادات</h1>
            <p>
              إدارة إعدادات الحساب والواجهة الخاصة
              بالمستخدم.
            </p>
          </div>

          <Link to="/" className={styles.backBtn}>
            العودة للداشبورد
          </Link>
        </header>

        <section className={styles.grid}>
          <div className={styles.card}>
            <h3>الحساب</h3>

            <div className={styles.item}>
              <span>اسم المستخدم</span>
              <strong>SmartShop User</strong>
            </div>

            <div className={styles.item}>
              <span>البريد الإلكتروني</span>
              <strong>user@smartshop.ai</strong>
            </div>
          </div>

          <div className={styles.card}>
            <h3>إعدادات الذكاء الاصطناعي</h3>

            <div className={styles.toggle}>
              <span>تفعيل AI Suggestions</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className={styles.toggle}>
              <span>تحسين الصور تلقائيًا</span>
              <input type="checkbox" />
            </div>
          </div>

          <div className={styles.card}>
            <h3>الإشعارات</h3>

            <div className={styles.toggle}>
              <span>إشعارات البريد</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className={styles.toggle}>
              <span>إشعارات النظام</span>
              <input type="checkbox" defaultChecked />
            </div>
          </div>

          <div className={styles.card}>
            <h3>الخطة الحالية</h3>

            <div className={styles.plan}>
              <strong>Pro AI Plan</strong>
              <span>300 Credits / month</span>
            </div>

            <button>
              Upgrade Plan
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Settings;