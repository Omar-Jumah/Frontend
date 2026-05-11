import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./ResultsPage.module.css";

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;
  const aiResult = location.state?.result;

  const defaultImage =
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700";

  const [result, setResult] = useState({
    score: "98%",
    description:
      "حذاء رياضي عصري بتصميم أنيق وخامات مريحة مناسبة للاستخدام اليومي والرياضي.",
    ad: "اكتشف الراحة والأداء مع أحدث إصدار رياضي بتصميم عصري وجودة عالية.",
    bio: "أناقة، راحة، وأداء في منتج واحد ✨",
    hashtags: "#رياضة #أحذية #Nike #Fashion #SmartShop",
    image: product?.image || defaultImage,
  });

  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!aiResult) return;

    setResult({
      score: aiResult.score || "98%",
      description:
        aiResult.description ||
        "حذاء رياضي عصري بتصميم أنيق وخامات مريحة.",
      ad:
        aiResult.ad ||
        "اكتشف الأداء العالي والتصميم العصري مع أحدث المنتجات.",
      bio: aiResult.bio || "أناقة وراحة في منتج واحد ✨",
      hashtags: Array.isArray(aiResult.hashtags)
        ? aiResult.hashtags.join(" ")
        : aiResult.hashtags || "#SmartShop #AI",
      image: product?.image || defaultImage,
    });
  }, [aiResult, product]);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast("تم نسخ المحتوى");
  };

  const handleDownloadImage = async () => {
    try {
      const response = await fetch(result.image);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${product?.name || "smartshop-product"}.png`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      showToast("تم تحميل الصورة");
    } catch (error) {
      console.error(error);
      alert("فشل تحميل الصورة");
    }
  };

  const handleRegenerate = async () => {
    try {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        showToast("تم إعادة التحليل بنجاح");
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.page}>
      {toast && <div className={styles.toast}>{toast}</div>}

      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.header}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => navigate("/dashboard")}
            >
              العودة للداشبورد
            </button>

            <div>
              <p className={styles.kicker}>AI Generated Result</p>

              <h1 className={styles.title}>
                نتيجة الذكاء الاصطناعي
              </h1>
            </div>
          </div>

          <div className={styles.grid}>
            <section className={styles.contentColumn}>
              <div className={styles.scoreCard}>
                <div>
                  <h2>المحتوى المنشأ</h2>

                  <p>مقياس الجودة</p>

                  <strong>ممتاز</strong>
                </div>

                <div className={styles.scoreCircle}>
                  {result.score}
                </div>
              </div>

              <ResultSection
                title="وصف المنتج"
                content={result.description}
                onCopy={copyToClipboard}
              />

              <ResultSection
                title="إعلان التواصل الاجتماعي"
                content={result.ad}
                onCopy={copyToClipboard}
              />

              <ResultSection
                title="الكابشن"
                content={result.bio}
                onCopy={copyToClipboard}
              />

              <ResultSection
                title="الهاشتاغات"
                content={result.hashtags}
                onCopy={copyToClipboard}
              />
            </section>

            <section className={styles.previewCard}>
              <div className={styles.cardHeader}>
                <h2>الصورة المحسنة</h2>

                <span>Preview</span>
              </div>

              <img
                src={result.image}
                alt="product"
                className={styles.imageGlow}
              />

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.cyanButton}
                  onClick={handleDownloadImage}
                >
                  تحميل الصورة
                </button>

                <button
                  type="button"
                  className={styles.pinkButton}
                  onClick={handleRegenerate}
                >
                  {loading ? "جاري التحليل..." : "إعادة التحليل"}
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function ResultSection({ title, content, onCopy }) {
  return (
    <div className={styles.resultCard}>
      <div className={styles.resultHeader}>
        <h3 className={styles.resultHeading}>{title}</h3>

        <button
          type="button"
          onClick={() => onCopy(content)}
          className={styles.iconButton}
        >
          📋
        </button>
      </div>

      <p className={styles.resultContent}>
        {content}
      </p>
    </div>
  );
}