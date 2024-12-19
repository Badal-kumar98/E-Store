import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaShoppingBasket, FaList, FaUsers } from "react-icons/fa";
import "./admindashboard.css";
import Layout from "../../components/layout/Layout";
import ProductDetail from "./productDetail/Productdetail";
import OrderDetail from "./orderDetail/OrderDetail";
import UserDetail from "./userDetail/UserDetail";
import { useContext } from "react";
import myContext from "../../context/MyContext";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { getAllProduct, getAllOrder, getAllUser } = context;
  return (
    <Layout>
      <div className="adminD-dashboard-container">
        {/* Top */}
        <div className="adminD-top-section mb-5 px-5 mt-5">
          <div className="adminD-dashboard-header">
            <h1 className="adminD-dashboard-title">Admin Dashboard</h1>
          </div>
        </div>

        <div className="px-5">
          {/* Mid  */}
          <div className="adminD-middle-section mb-5">
            <div className="adminD-admin-card">
              {/* image */}
              <div className="adminD-admin-image-container">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                  alt="Admin"
                  className="adminD-admin-image"
                />
              </div>
              {/* text */}
              <div className="adminD-admin-info">
                <h1 className="adminD-admin-text">
                  <span className="adminD-admin-label">Name :</span>{" "}
                  {user?.name}
                </h1>
                <h1 className="adminD-admin-text">
                  <span className="adminD-admin-label">Email :</span>{" "}
                  {user?.email}
                </h1>
                <h1 className="adminD-admin-text">
                  <span className="adminD-admin-label">Date :</span>{" "}
                  {user?.date}
                </h1>
                <h1 className="adminD-admin-text">
                  <span className="adminD-admin-label">Role :</span>{" "}
                  {user?.role}
                </h1>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="adminD-bottom-section">
            <Tabs>
              <TabList className="adminD-stat-cards">
                {/* Total Products */}
                <Tab className="adminD-stat-card">
                  <div className="adminD-card-content">
                    <div className="adminD-icon-container">
                      <FaShoppingBasket className="adminD-icon" />
                    </div>
                    <h2 className="adminD-stat-number">
                      {getAllProduct?.length}
                    </h2>
                    <p className="adminD-stat-label">Total Products</p>
                  </div>
                </Tab>

                {/* Total Orders */}
                <Tab className="adminD-stat-card">
                  <div className="adminD-card-content">
                    <div className="adminD-icon-container">
                      <FaList className="adminD-icon" />
                    </div>
                    <h2 className="adminD-stat-number">{getAllOrder?.length}</h2>
                    <p className="adminD-stat-label">Total Orders</p>
                  </div>
                </Tab>

                {/* Total Users */}
                <Tab className="adminD-stat-card">
                  <div className="adminD-card-content">
                    <div className="adminD-icon-container">
                      <FaUsers className="adminD-icon" />
                    </div>
                    <h2 className="adminD-stat-number">{getAllUser?.length}</h2>
                    <p className="adminD-stat-label">Total Users</p>
                  </div>
                </Tab>
              </TabList>

              <TabPanel>
                <ProductDetail />
              </TabPanel>

              <TabPanel>
                <OrderDetail />
              </TabPanel>

              <TabPanel>
                <UserDetail />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
