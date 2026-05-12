import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddEditList.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const found = products.find((p) => p.id === Number(id));
    if (!found) return;

    setProduct(found);
    setImage(found.image);
    setName(found.name);
    setDesc(found.desc);
  }, [id]);

  if (!product)
    return <div className="text-center text-light py-5">المنتج غير موجود</div>;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImage(base64);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImage(base64);
    }
  };

  const handleSave = () => {
    if (!name) {
      alert("يرجى إدخال اسم المنتج");
      return;
    }

    const updatedProduct = {
      ...product,
      name,
      desc,
      image,
      autoEnhance,
    };

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const updatedList = products.map((p) =>
      p.id === product.id ? updatedProduct : p
    );
    localStorage.setItem("products", JSON.stringify(updatedList));
    navigate("/");
  };

  return (
    <div className="container py-5">
      <h3 style={{ color: "#739abf" }} className="mb-4 fs-5 text-end fw-bold">
        SmartShop AI
      </h3>
      <h2 className="mb-4 text-end">Edit Product</h2>

      <div className="row g-4">
        <div className="col-md-5">
          <div className={`glassCard p-3 text-center`}>
            <h5 className="fs-4 text-white">{name}</h5>
            {image && (
              <>
              <img src={image} alt="صورة المنتج" className="img-fluid rounded mb-3" />
            <button
              className="btn btn-outline-light w-100 mb-3"
              onClick={() => setImage(null)} > استبدال الصورة </button>  </> )}
            {!image && ( <><h6 className="fw-bold mb-3 text-end">رفع صورة جديدة</h6>
                <div
                  className={`uploadBox d-flex flex-column justify-content-center align-items-center`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <i
                    className="bi-camera"
                    style={{ fontSize: "50px", opacity: 0.7 }}
                  ></i>
                  <div className="mt-2 text-light text-center"> <span>اسحب وأفلت صورة المنتج هنا</span> <br /><span>أو</span> <br />
                    <label
                      htmlFor="uploadInput"
                      className={`uploadLink text-decoration-underline`}
                      style={{ cursor: "pointer", color: "#fff" }} > اختر ملفًا </label>
                  </div>
                </div>

                <input
                  type="file"
                  id="uploadInput"
                  className="d-none"
                  onChange={handleImageUpload}
                />

                <div className={`switchBox d-flex justify-content-between align-items-center rounded-3 mt-3 py-2 px-3`}>
                  <span>تحسين الصورة تلقائيًا بالذكاء الاصطناعي</span>
                  <input
                    type="checkbox"
                    checked={autoEnhance}
                    onChange={() => setAutoEnhance(!autoEnhance)} /> </div> </>  )}
                 </div>
               </div>

        <div className="col-md-7">
          <div className={`glassCard glow p-4`}>
            <label className="d-block text-end">اسم المنتج</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control rounded-3 mb-3 text-white p-2"
            />

            <label className="d-block text-end">الوصف</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="form-control rounded-3 mb-3 text-white p-2"
              rows="4"
            ></textarea>

            <div className="d-flex gap-2">
              <button onClick={handleSave} className="btn btn-success w-50">حفظ التعديلات
              </button>
              <button onClick={() => navigate("/")} className="btn btn-secondary w-50"> رجوع للقائمة  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
