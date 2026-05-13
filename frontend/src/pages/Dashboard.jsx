import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    savedHours: 0,
    engagement: 0,
  });

  const [credits, setCredits] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await API.get("/stats");
      const creditRes = await API.get("/credits");
      const transactionsRes = await API.get("/credits/transactions");

      setStats(statsRes.data.stats || {});
      setCredits(creditRes.data.credits || 0);
      setTransactions(transactionsRes.data.transactions || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTopUp = async (amount) => {
    try {
      await API.post("/credits/topup", { amount });
      await fetchDashboardData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUseAI = async (amount, description) => {
    try {
      await API.post("/credits/use-ai", {
        amount,
        description,
      });

      await fetchDashboardData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className={styles.page} dir="rtl">
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div>
            <h2>SmartShop AI</h2>
            <p>E-commerce Assistant</p>
          </div>

          <div className={styles.brandIcon}>AI</div>
        </div>

        <nav className={styles.nav}>
          <Link className={styles.active} to="/">
            لوحة التحكم
          </Link>

          <Link to="/products">
            منتجاتي
          </Link>

          <Link to="/results">
            توليد المحتوى
          </Link>

          <Link to="/settings">
            الإعدادات
          </Link>
        </nav>
      </aside>

      <main className={styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.user}>
            <div className={styles.avatar}>S</div>
            <span>SmartShop User</span>
          </div>

          <h1>SmartShop AI</h1>

          <div className={styles.actions}>
            <div className={styles.notificationWrapper}>
              <button type="button">تنبيه</button>

              <div className={styles.notificationDropdown}>
                <strong>Notifications</strong>
                <p>لا توجد تنبيهات جديدة حاليًا</p>
              </div>
            </div>

            <div className={styles.notificationWrapper}>
              <button type="button">؟</button>

              <div className={styles.notificationDropdown}>
                <strong>Help</strong>
                <p>
                  هذا الداشبورد يدير الكريدت والإحصائيات ونتائج الذكاء
                  الاصطناعي.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.hero}>
          <span>AI Commerce Dashboard</span>
          <h2>Action Hub</h2>
          <p>
            إدارة رصيد الذكاء الاصطناعي، شحن الكريدت، ومتابعة مؤشرات استخدام
            خدمات AI في المشروع.
          </p>
        </section>

        <section className={styles.stats}>
          <div className={styles.statCard}>
            <span>عدد المنتجات</span>
            <strong>{stats?.totalProducts || 0}</strong>
            <small>API</small>
          </div>

          <div className={styles.statCard}>
            <span>الوقت الموفر</span>
            <strong>{stats?.savedHours || 0}h</strong>
          </div>

          <div className={styles.statCard}>
            <span>تفاعل الجمهور</span>
            <strong>{stats?.engagement || 0}%</strong>
          </div>
        </section>

        <section className={styles.creditPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span>AI Wallet</span>
              <h3>AI Credits</h3>
              <p>يتم خصم الكريدت تلقائيًا عند استخدام خدمات الذكاء الاصطناعي.</p>
            </div>

            <div className={styles.creditBox}>
              <span>الرصيد المتاح</span>
              <strong>{credits}</strong>
              <small>Available credits</small>
            </div>
          </div>

          <div className={styles.usageBar}>
            <div>
              <small>used from system wallet</small>
              <small>Usage</small>
            </div>

            <div className={styles.track}>
              <div
                className={styles.fill}
                style={{
                  width: `${Math.min(credits / 10, 100)}%`,
                }}
              />
            </div>
          </div>

          <div className={styles.creditGrid}>
            <div className={styles.pricingCard}>
              <div className={styles.cardTitle}>
                <h4>AI Pricing</h4>
                <span>Credits per action</span>
              </div>

              <button
                className={styles.priceRow}
                onClick={() =>
                  handleUseAI(5, "Generate product description")
                }
              >
                <span>Credits 5</span>
                <strong>توليد وصف</strong>
              </button>

              <button
                className={styles.priceRow}
                onClick={() => handleUseAI(8, "Generate social media ad")}
              >
                <span>Credits 8</span>
                <strong>إعلان سوشيال</strong>
              </button>

              <button
                className={styles.priceRow}
                onClick={() => handleUseAI(15, "Image enhancement")}
              >
                <span>Credits 15</span>
                <strong>تحسين صورة</strong>
              </button>
            </div>

            <div className={styles.topupCard}>
              <div className={styles.cardTitle}>
                <h4>Top Up Credits</h4>
                <span>Quick recharge</span>
              </div>

              <div className={styles.topupButtons}>
                <button onClick={() => handleTopUp(50)}>
                  <strong>50+</strong>
                  <span>$5</span>
                </button>

                <button onClick={() => handleTopUp(150)}>
                  <strong>150+</strong>
                  <span>$12</span>
                </button>

                <button onClick={() => handleTopUp(300)}>
                  <strong>300+</strong>
                  <span>$20</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.activity}>
          <div className={styles.cardTitle}>
            <h4>Recent Activity</h4>
            <span>آخر عمليات الشحن والخصم من MongoDB</span>
          </div>

          <div className={styles.activityList}>
            {transactions.slice(0, 4).map((item) => (
              <div className={styles.activityItem} key={item._id}>
                <div>
                  <strong>
                    {item.type === "topup" ? "شحن كريدت" : "استخدام AI"}
                  </strong>
                  <span>{item.description}</span>
                </div>

                <b className={item.type === "topup" ? styles.plus : styles.minus}>
                  {item.type === "topup" ? "+" : "-"}
                  {item.amount}
                </b>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;