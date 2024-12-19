import React from "react";
import Layout from "../../components/layout/Layout";
import HomePageProductCard from "../../components/productCard/HomePageProductCard";
import "./allproduct.css";

const AllProduct = () => {
  return (
    <Layout>
      <div className="allproducts">
        <HomePageProductCard />
      </div>
    </Layout>
  );
};

export default AllProduct;
