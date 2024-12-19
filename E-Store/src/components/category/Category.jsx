import React from "react";
import "./category.css";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const category = [
    {
      image: "https://cdn-icons-png.flaticon.com/256/4359/4359963.png",
      name: "fashion",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/256/11833/11833323.png",
      name: "shirt",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/256/8174/8174424.png",
      name: "jacket",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/256/7648/7648246.png",
      name: "mobile",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/256/12142/12142416.png",
      name: "laptop",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/256/10686/10686553.png",
      name: "shoes",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/256/12114/12114279.png",
      name: "home",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/256/11946/11946316.png",
      name: "books",
    },
  ];
  return (
    <div>
      <div className="ctg-container">
        <div className="ctg-main-wrapper">
          <div className="ctg-scroll-wrapper">
            {category.map((item, index) => (
              <div className="ctg-category-wrapper" key={index}>
                <div
                  className="ctg-category-item"
                  onClick={() => navigate(`/categoryPage/${item.name}`)}
                >
                  <div className="ctg-image-container">
                    <img src={item.image} alt="img" className="ctg-image" />
                  </div>
                  <h1 className="ctg-category-name">{item.name}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
