import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./Products.module.css";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  
const fetchProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/products"
    );

    setProducts(response.data.products);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        formData
      );

      setFormData({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const goToResult = (product) => {
    navigate("/results", {
      state: {
        product,
      },
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span>SmartShop AI</span>
            <h1>Products Management</h1>
            <p>إدارة المنتجات المرتبطة بالذكاء الاصطناعي</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={createProduct}>
          <input
            type="text"
            name="name"
            placeholder="اسم المنتج"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="وصف المنتج"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="السعر"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="رابط الصورة"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />

          <button type="submit">إضافة منتج</button>
        </form>

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <div key={product._id} className={styles.card}>
                <img
                  src={product.imageUrl || product.image}
                  alt={product.name || product.title}
                />

                <div className={styles.content}>
                  <h3>{product.name || product.title}</h3>

                  <p>{product.description}</p>

                  <strong>${product.price}</strong>

                  <button
                    type="button"
                    onClick={() => goToResult(product)}
                  >
                    توليد محتوى AI
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteProduct(product._id)}
                  >
                    حذف المنتج
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;