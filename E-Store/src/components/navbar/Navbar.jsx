import React, { useState } from "react";
import "./navbar.css";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import SearchBar from "../searchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const searchData = [
    {
      name: "Fashion",
      image:
        "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
    },
    {
      name: "Shirt",
      image:
        "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
    },
    {
      name: "Jacket",
      image:
        "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
    },
    {
      name: "Mobile",
      image:
        "https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg",
    },
    {
      name: "Laptop",
      image:
        "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
    },
    {
      name: "Home",
      image:
        "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
    },
    {
      name: "book",
      image:
        "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
    },
  ];

  const [search, setSearch] = useState("");
  const filterSearchData = searchData
    .filter((obj) => obj.name.toLowerCase().includes(search))
    .slice(0, 8);

  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  const cartItems = useSelector((state) => state.cart);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to={"/"} className="logo-link">
          E-Shopping
        </Link>
      </div>
      <div className={`navbar-menu ${menuActive ? "active" : ""}`}>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to={"/"} className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to={"/allproduct"} className="navbar-link">
              AllProducts
            </Link>
          </li>
          {!user ? (
            <li className="navbar-item">
              <Link to={"/signup"} className="navbar-link">
                SignUp
              </Link>
            </li>
          ) : (
            ""
          )}
          {!user ? (
            <li className="navbar-item">
              <Link to={"/login"} className="navbar-link">
                Login
              </Link>
            </li>
          ) : (
            ""
          )}
          {user?.role === "user" ? (
            <li className="navbar-item">
              <Link to={"/user-dashboard"} className="navbar-link">
                {user?.name}
              </Link>
            </li>
          ) : (
            ""
          )}
          {user?.role === "admin" ? (
            <li className="navbar-item">
              <Link to={"/admin-dashboard"} className="navbar-link">
                {user?.name}
              </Link>
            </li>
          ) : (
            ""
          )}
          {user && (
            <li className="navbar-item" onClick={logout}>
              <Link to={"/login"} className="navbar-link">
                Logout
              </Link>
            </li>
          )}
        </ul>
        <div className="search-container">
          <SearchBar />
        </div>
        <div className="navbar-icons">
          <Link to={"/cart"} className="icon-link cart-icon">
            <FaShoppingCart />
            <span className="cart-count">{cartItems.length}</span>
          </Link>
          <a href="#profile" className="icon-link user-icon">
            <FaUser />
          </a>
        </div>
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>
    </nav>
  );
};

export default Navbar;
