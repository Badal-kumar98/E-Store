import React, { useContext, useEffect, useState } from "react";
import "./productinfo.css";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/MyContext";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../../../FireBase/FirebaseConfigs";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const ProductInfo = () => {
  const { id } = useParams();
  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState("");
  const getProduct = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct({ ...productTemp.data(), id: productTemp.id });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.error("Removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  });

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <Layout>
      <div className="view-main-wrapper">
        {loading ? (
          <Loader />
        ) : (
          <div className="view-product-container">
            <div className="view-product-image">
              <img src={product?.productImageUrl} alt="Product Image" />
            </div>
            <div className="view-product-details">
              <h1 className="view-product-title">{product?.title}</h1>
              <div className="view-product-rating">
                ⭐⭐⭐⭐⭐
                <span className="view-reviews">(124 reviews)</span>
              </div>
              <p className="view-product-price">₹{product?.price}</p>
              <p className="view-product-description">{product?.description}</p>
              {cartItems?.some((p) => p.id === product.id) ? (
                <button
                  className="view-buy-button view-buy-button-delete"
                  onClick={() => deleteCart(product)}
                >
                  Delete To Cart
                </button>
              ) : (
                <button
                  className="view-buy-button view-buy-button-add"
                  onClick={() => addCart(product)}
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductInfo;
