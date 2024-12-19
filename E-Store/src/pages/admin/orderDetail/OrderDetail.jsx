import React, { useContext } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa"; // Import React Icons
import "./orderDetail.css";
import MyContext from "../../../context/MyContext";

const OrderDetail = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(MyContext);
  const { loading, getAllOrder, deleteProduct } = context;

  return (
    <div className="od-container">
      <div className="od-header">
        <h1 className="od-title">All Orders</h1>
      </div>

      <div className="od-table-container">
        <table className="od-table">
          <thead>
            <tr className="od-tr">
              <th className="od-th">S.No.</th>
              <th className="od-th">Order ID</th>
              <th className="od-th">Image</th>
              <th className="od-th">Title</th>
              <th className="od-th">Category</th>
              <th className="od-th">Price</th>
              <th className="od-th">Quantity</th>
              <th className="od-th">Total Price</th>
              <th className="od-th">Status</th>
              <th className="od-th">Name</th>
              <th className="od-th">Address</th>
              <th className="od-th">Pincode</th>
              <th className="od-th">Phone No</th>
              <th className="od-th">Email</th>
              <th className="od-th">Date</th>
              <th className="od-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {getAllOrder.map((order, index) => {
              return (
                <>
                  {order?.cartItems.map((item, index) => {
                    const {
                      id,
                      productImageUrl,
                      title,
                      category,
                      price,
                      quantity,
                    } = item;
                    return (
                      <tr className="od-row">
                        <td className="od-td">{index + 1}.</td>
                        <td className="od-td">{id}</td>
                        <td className="od-td">
                          <img
                            src={productImageUrl}
                            className="od-img"
                            alt=""
                          />
                        </td>
                        <td className="od-td">{title}</td>
                        <td className="od-td">{category}</td>
                        <td className="od-td">₹{price}</td>
                        <td className="od-td">{quantity}</td>
                        <td className="od-td">₹{price * quantity}</td>
                        <td className="od-status od-td">{order.status}</td>
                        <td className="od-td">{order.addressInfo.name}</td>
                        <td className="od-td">{order.addressInfo.address}</td>
                        <td className="od-td">{order.addressInfo.pincode}</td>
                        <td className="od-td">
                          {order.addressInfo.mobileNumber}
                        </td>
                        <td className="od-td">{order.email}</td>
                        <td className="od-td">{order.date}</td>
                        <td
                          className="od-action od-delete"
                          onClick={() => deleteProduct(order.id)}
                        >
                          <FaTrashAlt className="od-icon" />
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
