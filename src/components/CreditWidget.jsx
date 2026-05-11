import { useState } from "react";
import styles from "./CreditWidget.module.css";

export default function CreditWidget({ onNotify }) {
  const [credits, setCredits] = useState(100);
  const [usedCredits, setUsedCredits] = useState(35);

  const totalCredits = credits + usedCredits;

  const remainingPercentage =
    totalCredits === 0
      ? 0
      : Math.round((credits / totalCredits) * 100);

  const packages = [
    {
      label: "Basic",
      amount: 50,
      price: "$5",
      desc: "مناسب للبداية والمتاجر الصغيرة",
    },
    {
      label: "Pro",
      amount: 150,
      price: "$12",
      desc: "الأكثر استخدامًا لأصحاب المتاجر",
    },
    {
      label: "Business",
      amount: 300,
      price: "$20",
      desc: "حل متكامل للشركات والمتاجر الكبيرة",
    },
  ];

  const aiActions = [
    { label: "توليد وصف", cost: 5 },
    { label: "إعلان سوشال", cost: 8 },
    { label: "تحسين صورة", cost: 15 },
  ];

  const handleBuyCredits = (amount, label) => {
    setCredits((prev) => prev + amount);

    if (onNotify) {
      onNotify(`تم شراء باقة ${label} وإضافة ${amount} كريديت ✅`);
    }
  };

  const handleUseCredits = (cost, label) => {
    if (credits < cost) {
      if (onNotify) {
        onNotify("الرصيد غير كافٍ، يرجى شراء كريديت أولًا ⚠️");
      }

      return;
    }

    setCredits((prev) => prev - cost);
    setUsedCredits((prev) => prev + cost);

    if (onNotify) {
      onNotify(`تم استخدام ${label} وخصم ${cost} كريديت ✨`);
    }
  };

  return (
    <section className={styles.creditPanel}>
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>AI Credits</p>

          <h2 className={styles.title}>رصيد الذكاء الاصطناعي</h2>

          <p className={styles.subtitle}>
            الكريديت يُستخدم لتوليد المحتوى وتحسين صور المنتجات،
            ويمكن شحنه بسهولة من خلال الباقات.
          </p>
        </div>

        <div className={styles.balanceBox}>
          <span>الرصيد المتاح</span>
          <strong>{credits}</strong>
        </div>
      </div>

      <div className={styles.usageBox}>
        <div className={styles.usageHeader}>
          <span>استخدام الكريديت</span>
          <strong>{remainingPercentage}% متبقي</strong>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${remainingPercentage}%` }}
          />
        </div>

        <div className={styles.usageStats}>
          <div>
            <span>المستخدم</span>
            <strong>{usedCredits}</strong>
          </div>

          <div>
            <span>المتبقي</span>
            <strong>{credits}</strong>
          </div>

          <div>
            <span>الإجمالي</span>
            <strong>{totalCredits}</strong>
          </div>
        </div>
      </div>

      <div className={styles.sectionTitle}>استخدام خدمات AI</div>

      <div className={styles.costGrid}>
        {aiActions.map((action) => (
          <button
            key={action.label}
            type="button"
            className={styles.costItem}
            onClick={() => handleUseCredits(action.cost, action.label)}
          >
            <span>{action.label}</span>
            <strong>-{action.cost} Credits</strong>
          </button>
        ))}
      </div>

      <div className={styles.sectionTitle}>باقات الشحن</div>

      <div className={styles.packages}>
        {packages.map((plan) => (
          <div key={plan.label} className={styles.packageCard}>
            <div className={styles.packageTop}>
              <h3>{plan.label}</h3>
              <p>{plan.desc}</p>
            </div>

            <div className={styles.packageMiddle}>
              <strong>+{plan.amount}</strong>
              <span>{plan.price}</span>
            </div>

            <button
              type="button"
              className={styles.packageButton}
              onClick={() => handleBuyCredits(plan.amount, plan.label)}
            >
              شراء الباقة
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}