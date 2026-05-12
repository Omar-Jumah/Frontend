import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEditList.css";

function AddProduct() {
  const navigate = useNavigate();

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

  const handleGenerateContent = () => {
    if (!name) {
      alert("يرجى إدخال اسم المنتج");
      return;
    }

    const newProduct = {
      id: Date.now(),
      _id: String(Date.now()),
      name,
      desc,
      image,
      autoEnhance,
    };

    const oldProducts = JSON.parse(localStorage.getItem("products")) || [];
    oldProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(oldProducts));
    navigate("/dashboard");
  };

  return (
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-outline-light" onClick={() => navigate("/dashboard")}>
            رجوع
          </button>
          <h3 style={{ color: "#739abf" }} className="mb-0 fs-5 fw-bold">
            SmartShop AI
          </h3>
        </div>

        <h2 className="mb-4 fs-4 text-end">إضافة منتج</h2>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="glassCard glow rounded-3 p-4">
              <label className="d-block text-end">اسم المنتج</label>
              <input
                  type="text"
                  className="form-control rounded-3 mb-3 text-white p-2"
                  placeholder="اسم المنتج"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />

              <label className="d-block text-end">وصف مبدئي (اختياري)</label>
              <textarea
                  className="form-control rounded-3 mb-4 text-white p-2"
                  rows="4"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
              ></textarea>

              <button
                  className="neonBtn w-100 text-white rounded p-2 fs-6"
                  onClick={handleGenerateContent}
              >
                توليد المحتوى
              </button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="glassCard glow rounded-3 p-4">
              <h5 className="fw-bold mb-3 text-end">صورة المنتج</h5>

              <div
                  className="uploadBox d-flex flex-column justify-content-center align-items-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
              >
                {image ? (
                    <img src={image} alt="صورة المنتج" className="img-fluid rounded" />
                ) : (
                    <>
                      <i className="bi-image" style={{ fontSize: "50px", opacity: 0.7 }}></i>
                      <div className="mt-2 text-light text-center">
                        <span>اسحب وأفلت صورة المنتج هنا</span>
                        <br />
                        <span>أو</span>
                        <br />
                        <label htmlFor="uploadInput" className="uploadLink text-decoration-underline">
                          اختر ملفًا
                        </label>
                      </div>
                    </>
                )}
              </div>

              <input
                  type="file"
                  id="uploadInput"
                  className="d-none"
                  onChange={handleImageUpload}
              />

              <div className="switchBox d-flex justify-content-between align-items-center rounded-3 mt-3 py-2 px-3">
                <span>تحسين الصورة تلقائيًا بالذكاء الاصطناعي</span>
                <input
                    type="checkbox"
                    checked={autoEnhance}
                    onChange={() => setAutoEnhance(!autoEnhance)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default AddProduct;