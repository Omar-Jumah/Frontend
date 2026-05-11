import React from 'react';
import styles from './Steps.module.css';

const StepCard = (props) => {
  return (
    <div className={styles.stepCard}>
      <div className={styles.stepNumber}>{props.number}</div>
      <img src={props.image} className={styles.stepIcon} alt={props.title} />
      <h3 className={styles.stepTitle}>{props.title}</h3>
      <p className={styles.stepDescription}>{props.description}</p>
      {props.price && <div className={styles.priceTag}>{props.price}</div>}
        {props.showButton && (
        <button className={styles.buyBtn} onClick={props.onBuy}>
          اشتري الآن
        </button>
      )}
      <div className={styles.cardGlow}></div>
    </div>
  );
};

export default StepCard;
