import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./Results.module.css";

function Results() {
  const location = useLocation();
  const selectedProduct = location.state?.product;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const productName =
    selectedProduct?.name ||
    selectedProduct?.title ||
    "Smart Watch";

  const productDescription =
    selectedProduct?.description ||
    "Smart product for modern ecommerce stores.";

  const productImage =
    selectedProduct?.imageUrl ||
    selectedProduct?.image ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200";

  const productCategory =
    selectedProduct?.category || "Accessories";

  const generateAI = async () => {
    try {
      setLoading(true);

      setTimeout(() => {
        setResult({
          title: productName,

          score: Math.floor(Math.random() * 10) + 90,

          imageUrl: productImage,

          description: `منتج ${productName} من فئة ${productCategory} يتميز بـ ${productDescription}، مع صياغة تسويقية ذكية تساعد على جذب العملاء وزيادة التفاعل.`,

          socialAd: `اكتشف ${productName} الآن! خيار مثالي يجمع بين الجودة والقيمة العالية لعملائك.`,

          caption: `${productName} — اختيار ذكي لمتجرك الإلكتروني.`,

          hashtags: `#SmartShopAI #Ecommerce #${productCategory.replace(
            /\s+/g,
            ""
          )} #${productName.replace(/\s+/g, "")}`,
        });

        setLoading(false);
      }, 1200);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
    alert("Copied Successfully");
  };

  return (
    <div className={styles.page} dir="rtl">
      <main className={styles.shell}>
        <header className={styles.header}>
          <div>
            <span>AI Generated Result</span>
            <h1>نتيجة الذكاء الاصطناعي</h1>
          </div>

          <Link to="/products" className={styles.backBtn}>
            العودة للمنتجات
          </Link>
        </header>

        {!result && (
          <div className={styles.generateArea}>
            <h2>AI Content Studio</h2>

            <p>
              سيتم توليد محتوى تسويقي ذكي للمنتج:
              <strong> {productName}</strong>
            </p>

            <button onClick={generateAI} disabled={loading}>
              {loading ? "Generating..." : "Generate With AI"}
            </button>
          </div>
        )}

        {result && (
          <section className={styles.grid}>
            <section className={styles.resultPanel}>
              <div className={styles.scoreCard}>
                <div>
                  <h2>المحتوى المنشأ</h2>
                  <p>مقياس الجودة</p>
                  <strong>تم إنشاء المحتوى الذكي بنجاح</strong>
                </div>

                <div className={styles.scoreCircle}>
                  {result.score}%
                </div>
              </div>

              <div className={styles.resultBox}>
                <button
                  className={styles.copyIcon}
                  onClick={() => copyText(result.description)}
                >
                  نسخ
                </button>

                <div>
                  <h3>وصف المنتج</h3>
                  <p>{result.description}</p>
                </div>
              </div>

              <div className={styles.resultBox}>
                <button
                  className={styles.copyIcon}
                  onClick={() => copyText(result.socialAd)}
                >
                  نسخ
                </button>

                <div>
                  <h3>إعلان التواصل الاجتماعي</h3>
                  <p>{result.socialAd}</p>
                </div>
              </div>

              <div className={styles.resultBox}>
                <button
                  className={styles.copyIcon}
                  onClick={() => copyText(result.caption)}
                >
                  نسخ
                </button>

                <div>
                  <h3>الكابشن</h3>
                  <p>{result.caption}</p>
                </div>
              </div>

              <div className={styles.resultBox}>
                <button
                  className={styles.copyIcon}
                  onClick={() => copyText(result.hashtags)}
                >
                  نسخ
                </button>

                <div>
                  <h3>الهاشتاغات</h3>
                  <p>{result.hashtags}</p>
                </div>
              </div>
            </section>

            <aside className={styles.previewCard}>
              <div className={styles.previewTop}>
                <h3>صورة المنتج</h3>
                <span>Preview</span>
              </div>

              <img src={result.imageUrl} alt={result.title} />

              <button
                className={styles.openBtn}
                onClick={() => window.open(result.imageUrl)}
              >
                فتح الصورة
              </button>

              <button
                className={styles.generateBtn}
                onClick={generateAI}
              >
                توليد نتيجة جديدة
              </button>
            </aside>
          </section>
        )}
      </main>
    </div>
  );
}

export default Results;