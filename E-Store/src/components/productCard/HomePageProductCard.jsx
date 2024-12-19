import React, { useContext, useEffect } from "react";
import "./productCard.css";
import { useNavigate, useLocation } from "react-router-dom";
import MyContext from "../../context/MyContext";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const HomePageProductCard = () => {
  const navigate = useNavigate();

  const context = useContext(MyContext);
  const { loading, getAllProduct } = context;

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
  },[cartItems]);

  const location = useLocation();
  const isAllProductsPage = location.pathname === "/allproduct";
  const heading = isAllProductsPage ? "All Products" : "BestSelling Products";

  return (
    <div>
      <div className="product-heading">
        <h1 className="product-names">{heading}</h1>
        <div className="product-lines"></div>
        <div className="product-loader">{loading && <Loader />}</div>
        <div className="productPage">
          {getAllProduct.map((item, index) => {
            const {
              id,
              title,
              price,
              productImageUrl,
              description: desc,
            } = item;
            return (
              <div key={index} className="product-card">
                <div
                  className="product-card-image"
                  onClick={() => navigate(`./productinfo/${id}`)}
                >
                  <img src={productImageUrl} alt="Product" />
                </div>
                <div className="product-card-content">
                  <h3 className="product-card-title">
                    {title.substring(0, 25)}
                  </h3>
                  <p className="product-card-price">₹{price}</p>
                  <p className="product-card-description">{desc}</p>
                  <div className="product-card-actions">
                    {cartItems?.some((p) => p.id === item.id) ? (
                      <button
                        className="product-btn product-btn-details"
                        onClick={() => deleteCart(item)}
                      >
                        Delete From Cart
                      </button>
                    ) : (
                      <button
                        className="product-btn product-btn-buy"
                        onClick={() => addCart(item)}
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePageProductCard;
