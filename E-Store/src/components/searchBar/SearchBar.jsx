import React, { useContext, useState } from "react";
import "./searchBar.css";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const context = useContext(MyContext);
  const { getAllProduct } = context;
  const [search, setSearch] = useState("");

  const filterSearchData = getAllProduct
    .filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 8);
  const navigate = useNavigate();
  return (
    <div className="searchbar-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      {search && (
        <div className="search-dropdown">
          {filterSearchData.length > 0 ? (
            filterSearchData.map((item, index) => (
              <div
                key={index}
                className="search-item"
                onClick={() => navigate(`/productinfo/${item.id}`)}
              >
                <div className="search-item-content">
                  <img
                    className="search-item-image"
                    src={item.productImageUrl}
                    alt={item.title}
                  />
                  <span className="search-item-text">{item.title}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="search-empty">
              <img
                className="search-empty-image"
                src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                alt="No results"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
