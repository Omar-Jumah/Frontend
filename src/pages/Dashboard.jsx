import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import StatsCard from "../components/StatsCard";
import CreditWidget from "../components/CreditWidget";

import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });

  const [stats] = useState({
    totalProducts: products.length,
    savedHours: 48,
    engagement: "82%",
  });

  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const scrollToProducts = () => {
    document.getElementById("products-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const menuItems = useMemo(
      () => [
        {
          name: "لوحة التحكم",
          icon: "▦",
          active: true,
          action: () => navigate("/"),
        },
        {
          name: "منتجاتي",
          icon: "◈",
          active: false,
          action: () => setShowProductsModal(true),
        },
        {
          name: "توليد المحتوى",
          icon: "SmartShop",
          active: false,
          action: () => navigate("/add-product"),

        },
        {
          name: "تحسين الصور",
          icon: "▣",
          active: false,
          action: () => navigate("/add-product"),

        },
        {
          name: "الإعدادات",
          icon: "إعداد",
          active: false,
          action: () => setShowSettings(true),
        },
      ],
      [navigate]
  );

  return (
      <div className={styles.page}>
        {toast && <div className={styles.toast}>{toast}</div>}

        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <div className={styles.brandBox}>
              <div className={styles.brandIcon}>AI</div>
              <div>
                <h2 className={styles.logo}>SmartShop AI</h2>
                <p className={styles.brandText}>E-commerce Assistant</p>
              </div>
            </div>

            <nav className={styles.menu}>
              {menuItems.map((item) => (
                  <button
                      key={item.name}
                      type="button"
                      onClick={item.action}
                      className={`${styles.menuItem} ${item.active ? styles.activeMenuItem : ""}`}
                  >
                    <span>{item.name}</span>
                    <span className={item.active ? styles.activeMenuIcon : styles.menuIcon}>
                  {item.icon}
                </span>
                  </button>
              ))}
            </nav>
          </aside>

          <main className={styles.main}>
            <header className={styles.topBar}>
              <div className={styles.icons}>
                <button
                    type="button"
                    className={styles.circleIcon}
                    onClick={() => setShowHelp(true)}
                >
                  ?
                </button>
                <button
                    type="button"
                    className={styles.circleIcon}
                    onClick={() => setShowNotifications(true)}
                >
                  تنبيه
                </button>
              </div>
              <h2 className={styles.topLogo}>SmartShop AI</h2>
              <div className={styles.userBox}>
                <span className={styles.userName}>SmartShop User</span>
                <div className={styles.avatar}>S</div>
              </div>
            </header>

            <section className={styles.hero}>
              <div>
                <p className={styles.kicker}>AI Commerce Dashboard</p>
                <h1 className={styles.title}>Action Hub</h1>
                <p className={styles.subtitle}>
                  إدارة المنتجات، توليد المحتوى، وتحسين الصور من مكان واحد.
                </p>
              </div>
              <button
                  type="button"
                  className={styles.quickButton}
                  onClick={() =>
                      navigate("/results", {
                        state: { product: products[0] },
                      })
                  }
              >
                توليد سريع
              </button>
            </section>

            <section className={styles.statsGrid}>
              <StatsCard
                  title="المنتجات التي تم إنشاؤها"
                  value={stats.totalProducts}
                  extra="+15%"
                  type="line"
              />
              <StatsCard title="الوقت الموفر" value={`${stats.savedHours}h`} type="circle" />
              <StatsCard title="تفاعل الجمهور" value={stats.engagement} type="wave" />
            </section>

            <CreditWidget onNotify={showToast} />

            <section id="products-section" className={styles.productsSection}>
              <div className={styles.productsHeader}>
                <span className={styles.productsLabel}>المعروض</span>
                <h2 className={styles.productsTitle}>أحدث المنتجات</h2>
              </div>
              <div className={styles.productsGrid}>
                {products.map((product) => (
                    <ProductCard
                        key={product._id || product.id || product.name}
                        product={product}
                        onNotify={showToast}
                    />
                ))}
              </div>
            </section>
          </main>
        </div>

        {showProductsModal && (
            <div className={styles.overlay} onClick={() => setShowProductsModal(false)}>
              <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h3>منتجاتي</h3>
                  <button type="button" onClick={() => setShowProductsModal(false)}>×</button>
                </div>
                {products.map((product) => (
                    <div key={product._id || product.id || product.name} className={styles.notice}>
                      {product.name}
                    </div>
                ))}
                <button
                    type="button"
                    className={styles.modalButton}
                    onClick={() => {
                      setShowProductsModal(false);
                      scrollToProducts();
                    }}
                >
                  عرض المنتجات
                </button>
              </div>
            </div>
        )}

        {showSettings && (
            <div className={styles.overlay} onClick={() => setShowSettings(false)}>
              <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h3>الإعدادات</h3>
                  <button type="button" onClick={() => setShowSettings(false)}>×</button>
                </div>
                <div className={styles.settingRow}>
                  <span>اللغة</span>
                  <strong>العربية</strong>
                </div>
                <div className={styles.settingRow}>
                  <span>الوضع</span>
                  <strong>Light Mode</strong>
                </div>
                <div className={styles.settingRow}>
                  <span>الإشعارات</span>
                  <strong>مفعلة</strong>
                </div>
                <button
                    type="button"
                    className={styles.modalButton}
                    onClick={() => {
                      setShowSettings(false);
                      showToast("تم حفظ الإعدادات بنجاح");
                    }}
                >
                  حفظ الإعدادات
                </button>
              </div>
            </div>
        )}

        {showHelp && (
            <div className={styles.overlay} onClick={() => setShowHelp(false)}>
              <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h3>مساعدة سريعة</h3>
                  <button type="button" onClick={() => setShowHelp(false)}>×</button>
                </div>
                <p className={styles.modalText}>
                  استخدمي زر توليد سريع لإنشاء محتوى تسويقي احترافي وتحسين صور المنتجات.
                </p>
                <button type="button" className={styles.modalButton} onClick={() => setShowHelp(false)}>
                  فهمت
                </button>
              </div>
            </div>
        )}

        {showNotifications && (
            <div className={styles.overlay} onClick={() => setShowNotifications(false)}>
              <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h3>الإشعارات</h3>
                  <button type="button" onClick={() => setShowNotifications(false)}>×</button>
                </div>
                <div className={styles.notice}>تم تحسين 3 منتجات هذا الأسبوع.</div>
                <div className={styles.notice}>معدل التفاعل ارتفع بنسبة 15%.</div>
                <div className={styles.notice}>لديك رصيد كريديت متاح للاستخدام.</div>
              </div>
            </div>
        )}
      </div>
  );
}