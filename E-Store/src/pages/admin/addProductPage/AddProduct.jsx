import React, { useContext, useState } from "react";
import "./addproduct.css";
import MyContext from "../../../context/MyContext";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../../../../FireBase/FirebaseConfigs";
import { useNavigate } from "react-router-dom";
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

const AddProduct = () => {
  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

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

  const AddProducthandler = async () => {
    if (
      product.title == "" ||
      product.price == "" ||
      product.productImageUrl == "" ||
      product.category == "" ||
      product.description == ""
    ) {
      return toast.error("All feilds are required");
    }

    setLoading(true);

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Add Product Successfully");
      navigate("/admin-dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Add product failed");
    }
  };

  return (
    <div className="addproduct-container">
      <div className="addproduct-flex-wrapper">
        <div className="addproduct-form">
          <div className="addproduct-heading">
            <h2>Add Product</h2>
          </div>

          <div className="addproduct-input-group">
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              className="addproduct-input"
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value,
                });
              }}
            />
          </div>

          <div className="addproduct-input-group">
            <input
              type="number"
              placeholder="Product Price"
              className="addproduct-input"
              value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value,
                });
              }}
            />
          </div>

          <div className="addproduct-input-group">
            <input
              type="text"
              placeholder="Product Image Url"
              className="addproduct-input"
              value={product.productImageUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageUrl: e.target.value,
                });
              }}
            />
          </div>

          <div className="addproduct-input-group">
            <select
              className="addproduct-select"
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          <div className="addproduct-input-group">
            <textarea
              name="description"
              placeholder="Product Description"
              rows="3"
              className="addproduct-textarea"
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
            ></textarea>
          </div>

          <div className="addproduct-button-wrapper">
            <button
              type="button"
              className="addproduct-button"
              onClick={AddProducthandler}
            >
              {loading ? <Loader /> : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
