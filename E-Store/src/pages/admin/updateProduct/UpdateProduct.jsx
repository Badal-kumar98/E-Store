import React, { useContext, useEffect, useState } from "react";
import "./updateproduct.css";
import MyContext from "../../../context/MyContext";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { fireDB } from "../../../../../FireBase/FirebaseConfigs";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";

const categoryList = [
  { name: "fashion" },
  { name: "shirt" },
  { name: "jacket" },
  { name: "mobile" },
  { name: "laptop" },
  { name: "shoes" },
  { name: "home" },
  { name: "books" },
];

const UpdateProduct = () => {
  const context = useContext(MyContext);
  const { loading, setLoading, getAllProductHandler } = context;

  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const updateProducthandler = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const productData = productTemp.data();

      setProduct({
        title: productData.title,
        price: productData.price,
        productImageUrl: productData.productImageUrl,
        category: productData.category,
        description: productData.description,
        quantity: productData.quantity,
        time: productData.time,
        date: productData.date,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProductSubmitHandler = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product);
      toast.success("Update Product Successfully");
      getAllProductHandler();
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateProducthandler();
  }, []);

  return (
    <div className="updateP-container">
      <div className="updateP-flex-wrapper">
        <form className="updateP-form">
          <div className="updateP-heading">
            <h2>Update Product</h2>
          </div>
          <div className="updateP-input-group">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({ ...product, title: e.target.value });
              }}
              placeholder="Product Title"
              className="updateP-input"
            />
          </div>
          <div className="updateP-input-group">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
              placeholder="Product Price"
              className="updateP-input"
            />
          </div>
          <div className="updateP-input-group">
            <input
              type="text"
              name="productImageUrl"
              value={product.productImageUrl}
              onChange={(e) => {
                setProduct({ ...product, productImageUrl: e.target.value });
              }}
              placeholder="Product Image URL"
              className="updateP-input"
            />
          </div>
          <div className="updateP-input-group">
            <select
              className="updateP-select"
              value={product.category}
              onChange={(e) => {
                setProduct({ ...product, category: e.target.value });
              }}
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="updateP-input-group">
            <textarea
              name="description"
              placeholder="Product Description"
              value={product.description}
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
              rows="5"
              className="updateP-textarea"
            ></textarea>
          </div>
          <div className="updateP-button-wrapper">
            <button
              type="button"
              className="updateP-button"
              onClick={updateProductSubmitHandler}
            >
              {loading ? <Loader /> : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
