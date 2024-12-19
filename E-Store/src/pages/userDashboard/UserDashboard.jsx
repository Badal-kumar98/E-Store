import React, { useContext } from "react";
import "./userdashboard.css";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/MyContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));

  const context = useContext(MyContext);
  const { loading, getAllOrder } = context;

  return (
    <Layout>
      <div className="userD-container">
        {/* User Card */}
        <div className="userD-card">
          <img
            className="userD-avatar"
            src="https://via.placeholder.com/100"
            alt="User Avatar"
          />
          <div className="userD-info">
            <p className="userD-name">
              <strong>Name:</strong> {user?.name}
            </p>
            <p className="userD-email">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="userD-email">
              <strong>Date:</strong> {user?.date}
            </p>
            <p className="userD-email">
              <strong>Role:</strong> {user?.role}
            </p>
          </div>
        </div>

        {/* Order Section */}
        <div className="userD-order-section">
          <h2 className="userD-order-heading">Order Details</h2>
          {loading ? (
            <Loader />
          ) : (
            getAllOrder
              .filter((obj) => obj.userid === user?.uid)
              .map((order, index) => {
                return (
                  <div key={index} className="userD-order-container">
                    {order?.cartItems.map((item, index) => {
                      const {
                        id,
                        date,
                        quantity,
                        price,
                        title,
                        productImageUrl,
                        category,
                      } = item;
                      const { status } = order;
                      return (
                        <div key={index} className="userD-order-card">
                          <div className="userD-order-info">
                            <p>
                              <strong>Order Id:</strong> #{id}
                            </p>
                            <p>
                              <strong>Date:</strong> {date}
                            </p>
                            <p>
                              <strong>Total Amount:</strong> ₹{price * quantity}
                            </p>
                            <p>
                              <strong>Order Status:</strong>{" "}
                              <span className="userD-status-confirmed">
                                {status}
                              </span>
                            </p>
                          </div>
                          <div className="userD-product-info">
                            <img
                              className="userD-product-image"
                              src={productImageUrl}
                              alt="Product"
                            />
                            <div className="userD-product-details">
                              <p className="userD-product-name">{title}</p>
                              <p className="userD-product-description">
                                {category}
                              </p>
                              <p className="userD-product-quantity">
                                x {quantity}
                              </p>
                            </div>
                            <p className="userD-product-price">₹{price}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
