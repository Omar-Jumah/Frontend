
import styles from "./StatsCard.module.css";

export default function StatsCard({ title, value, extra, type }) {
  return (
    <div className={`${styles.card} ${styles[type] || ""}`}>
      <p className={styles.title}>{title}</p>

      <h2 className={styles.value}>{value}</h2>

      {extra && <p className={styles.extra}>{extra}</p>}

      {type === "circle" && (
        <div className={styles.circleChart}>
          <svg width="74" height="74" viewBox="0 0 74 74">
            <circle
              cx="37"
              cy="37"
              r="27"
              fill="none"
              stroke="rgba(137,229,255,0.25)"
              strokeWidth="8"
            />
            <circle
              cx="37"
              cy="37"
              r="27"
              fill="none"
              stroke="#57e9ff"
              strokeWidth="8"
              strokeDasharray="128 170"
              strokeLinecap="round"
              transform="rotate(-90 37 37)"
              className={styles.cyanGlow}
            />
          </svg>
        </div>
      )}

      {type === "wave" && (
        <div className={styles.chartArea}>
          <svg viewBox="0 0 160 50" className={styles.svgFull}>
            <path
              d="M0 37 C15 25, 25 45, 40 28 S65 18, 80 32 S105 39, 120 24 S145 21, 160 30"
              fill="none"
              stroke="#68eaff"
              strokeWidth="3"
              strokeLinecap="round"
              className={styles.waveGlow}
            />
          </svg>
        </div>
      )}

      {type === "line" && (
        <div className={styles.chartArea}>
          <svg viewBox="0 0 160 50" className={styles.svgFull}>
            <path
              d="M0 38 C20 35, 25 30, 42 31 C58 32, 60 22, 77 22 C98 22, 95 15, 112 15 C130 15, 132 7, 150 8 L160 4"
              fill="none"
              stroke="#39f59b"
              strokeWidth="3"
              strokeLinecap="round"
              className={styles.greenGlow}
            />
          </svg>
        </div>
      )}
    </div>
  );
}