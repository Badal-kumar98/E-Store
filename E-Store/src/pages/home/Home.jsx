import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Category from "../../components/category/Category";
import HomePageProductCard from "../../components/productCard/HomePageProductCard";
import Track from "../../components/track/Track";
import Testimonials from "../../components/testimonials/Testimonials";
import Loader from "../../components/loader/Loader";

const Home = () => {
  return (
    <div>
      <Layout>
        <HeroSection />
        <Category />
        <HomePageProductCard />
        <Track />
        <Testimonials />
      </Layout>
    </div>
  );
};

export default Home;
