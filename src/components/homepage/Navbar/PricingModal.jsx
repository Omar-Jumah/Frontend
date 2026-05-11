import React from 'react';
import styles from './PricingModal.module.css';
import StepCard from '../Steps/StepCard.jsx';

const PricingModal = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>باقات الكريدت</h2>
        
        <div className={styles.cardsGrid}>
          <StepCard 
            image="/imges/50.png" 
            title="الباقة الأساسية"
            description="مثالية للتجربة والبدء بمشاريعك الصغيرة."
            price="9$"
            showButton={true}
          />
          <StepCard 
            image="/imges/200.png" 
            title="الباقة المتقدمة"
            description="الخيار الأكثر شعبية للمتاجر المتوسطة."
            price="29$"
            showButton={true}
          />
          <StepCard 
            image="/imges/1000.png" 
            title="باقة المحترفين"
            description="رصيد ضخم للشركات والاستخدام الكثيف."
            price="99$"
            showButton={true}
          />
        </div>
        <button className={styles.closeBtn} onClick={onClose}>إغلاق النافذة</button>
      </div>
    </div>
  );
};

export default PricingModal;