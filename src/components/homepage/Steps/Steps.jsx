import React from 'react';
import StepCard from './StepCard.jsx';
import styles from './Steps.module.css';

const Steps = () => {
  return (
    <section className={styles.stepsSection}>
      <h2 className={styles.sectionTitle}>خطوات بسيطة لنتائج مذهلة</h2>
      <div className={styles.stepsContainer}>
        <StepCard 
          number="01"
          image="imges/upload.png" 
          title="ارفع صورتك"
          description="قم برفع صورة منتجك الأصلية و أسم المنتج، وسيتولى ذكاؤنا الاصطناعي الباقي."
          showButton={false}
        />
        <StepCard 
          number="02"
          image="imges/ai_process.png" 
          title="المعالجة الذكية"
          description="يقوم نظامنا بتحليل الصورة وتحسين إضاءتها وخلفيتها و توليد نصوص احترافية."
          showButton={false}
        />
        <StepCard 
          number="03"
          image="/imges/download.png" 
          title="احصل على النتيجة"
          description="خلال ثواني , ستحصل على صور احترافية بجودة عالية جاهزة للنشر فورا."
          showButton={false}
        />
      </div>
    </section>
  );
};

export default Steps;
