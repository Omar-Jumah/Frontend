import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEditList.css";

function ProductsList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(saved);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("هل أنت متأكد من حذف المنتج؟")) {
            const updated = products.filter((p) => p.id !== id);
            setProducts(updated);
            localStorage.setItem("products", JSON.stringify(updated));
        }
    };

    return (
        <div className="container py-5" style={{ paddingTop: "80px" }}>
            <div className={`glassCard shadow-lg p-4`}>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mt-4 me-4" style={{ color: "" }}> منتجاتي </h2>

                    <button
                        className="neonBtn"
                        onClick={() => navigate("/add-product")} > إضافة منتج جديد
                    </button>
                </div>

                {products.length === 0 && (
                    <p className="text-center text-light py-5 fs-5"> لا يوجد منتجات بعد </p> )}

                <div className="row">
                    {products.map((p) => (
                        <div className="col-md-4 mb-4" key={p.id}>
                            <div className={`glassCard p-3`}>

                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="img-fluid rounded mb-3"
                                />

                                <h5 className="fw-bold">{p.name}</h5>

                                <div className="d-flex gap-2 mt-3">
                                    <button
                                        className="btn btn-outline-light w-50"
                                        onClick={() => navigate(`/edit-product/${p.id}`)} > تعديل
                                    </button>

                                    <button
                                        className="btn btn-danger w-50"
                                        onClick={() => handleDelete(p.id)} > حذف </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductsList;