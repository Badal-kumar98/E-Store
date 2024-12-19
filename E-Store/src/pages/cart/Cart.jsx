import React, { useEffect, useState } from "react";
import "./cart.css";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../FireBase/FirebaseConfigs";
import { Navigate } from "react-router-dom";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.error("Removed from cart");
  };

  const incrementHandle = (id) => {
    dispatch(incrementQuantity(id));
  };

  const decrementHandle = (id) => {
    dispatch(decrementQuantity(id));
  };

  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const user = JSON.parse(localStorage.getItem("users"));

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const buyNowHandler = async () => {
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      toast.error("Please fill all the fields");
    }
    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    try {
      const orderRef = collection(fireDB, "order");
      await addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      });
      toast.success("Order Placed Successfull");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="carts-main-wrapper">
        <div className="carts-container">
          <div className="carts-cart-section">
            <h2 className="carts-title">Shopping Cart</h2>
            <div className="carts-lines"></div>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => {
                const {
                  id,
                  title,
                  productImageUrl,
                  price,
                  category,
                  quantity,
                } = item;
                return (
                  <div key={index} className="carts-cart-item">
                    <img
                      className="carts-item-image"
                      src={productImageUrl}
                      alt="Stylish Modern Chair"
                    />
                    <div className="carts-item-details">
                      <p className="carts-item-name">{title}</p>
                      <p className="carts-item-color">{category}</p>
                      <p className="carts-item-price">₹{price}</p>
                      <div className="carts-item-quantity">
                        <button
                          className="carts-decrement-btn"
                          onClick={() => decrementHandle(id)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="carts-quantity-input"
                          value={quantity}
                          readOnly
                        />
                        <button
                          className="carts-increment-btn"
                          onClick={() => incrementHandle(id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="carts-remove-btn"
                        onClick={() => deleteCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Order Summary Section */}
          <div className="carts-order-summary">
            <h2 className="carts-title">Order Summary</h2>
            <div className="carts-lines"></div>
            <div className="carts-summary-detail">
              <p className="carts-summary-label">
                Price ({cartItemTotal} item)
              </p>
              <p className="carts-summary-value">₹ {cartTotal}</p>
            </div>
            <div className="carts-summary-detail">
              <p className="carts-summary-label">Delivery Charges:</p>
              <p className="carts-summary-value carts-free">Free</p>
            </div>
            <div className="carts-summary-detail">
              <p className="carts-summary-label">Total Amount:</p>
              <p className="carts-summary-value">₹ {cartTotal}</p>
            </div>
            <div className="carts-checkout-button">
              {user ? (
                <BuyNowModal
                  addressInfo={addressInfo}
                  setAddressInfo={setAddressInfo}
                  buyNowHandler={buyNowHandler}
                />
              ) : (
                <Navigate to={"/login"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
