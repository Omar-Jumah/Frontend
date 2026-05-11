import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

export default function ProductCard({
  product,
  onNotify,
}) {
  const navigate = useNavigate();

  const defaultImage =
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700";

  const imageUrl =
    product?.image || defaultImage;

  const handleEditContent = () => {
    navigate("/results", {
      state: { product },
    });
  };

  const handleDownloadImage = () => {
    window.open(imageUrl, "_blank");

    if (onNotify) {
      onNotify("تم فتح الصورة بنجاح");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={product?.name || "Product"}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>
          {product?.name || "Product"}
        </h3>

        <p className={styles.time}>
          تم التحديث منذ ساعتين
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleEditContent}
            className={styles.editButton}
          >
            تعديل المحتوى
          </button>

          <button
            type="button"
            onClick={handleDownloadImage}
            className={styles.downloadButton}
          >
            تحميل الصورة
          </button>
        </div>
      </div>
    </div>
  );
}