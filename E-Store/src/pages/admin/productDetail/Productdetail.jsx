import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./productDetail.css";
import myContext from "../../../context/MyContext";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../../../../FireBase/FirebaseConfigs";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";

const ProductDetail = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProduct, getAllProductHandler } = context;

  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", id));
      toast.success("Product Deleted successfully");
      getAllProductHandler();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="productD-wrapper">
      {/* Header Section */}
      <div className="productD-header">
        <h1 className="productD-title">All Products</h1>
        <Link to="/add-product">
          <button className="productD-addButton">Add Product</button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="productD-tableWrapper">
        <table className="productD-table">
          <thead>
            <tr>
              <th className="productD-tableHeader">S.No.</th>
              <th className="productD-tableHeader">Image</th>
              <th className="productD-tableHeader">Title</th>
              <th className="productD-tableHeader">Price</th>
              <th className="productD-tableHeader">Category</th>
              <th className="productD-tableHeader">Date</th>
              <th className="productD-tableHeader">Edit</th>
              <th className="productD-tableHeader">Delete</th>
            </tr>
          </thead>
          <tbody>
            {getAllProduct.map((item, index) => {
              const { id, title, price, category, date, productImageUrl } =
                item;
              return (
                <tr key={id} className="productD-tableRow">
                  <td className="productD-tableData">{index + 1}</td>
                  <td className="productD-tableData">
                    <img
                      src={productImageUrl}
                      alt="Product"
                      className="productD-image"
                    />
                  </td>
                  <td className="productD-tableData">{title}</td>
                  <td className="productD-tableData">&#8377;{price}</td>
                  <td className="productD-tableData">{category}</td>
                  <td className="productD-tableData">{date}</td>
                  <td
                    className="productD-tableData"
                    onClick={() => navigate(`/update-product/${id}`)}
                  >
                    <span className="productD-edit">
                      <FaUserEdit className="ud-icon" />
                    </span>
                  </td>
                  <td
                    className="productD-tableData"
                    onClick={() => deleteProduct(id)}
                  >
                    {loading ? (
                      <Loader />
                    ) : (
                      <span className="productD-delete">
                        <FaTrashAlt className="ud-icon" />
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
