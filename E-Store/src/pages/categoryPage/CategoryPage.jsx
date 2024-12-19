import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import MyContext from "../../context/MyContext";
import Loader from "../../components/loader/Loader";
import "./categoryPage.css";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(MyContext);
  const { getAllProduct, loading } = context;
  const navigate = useNavigate();

  const filterProduct = getAllProduct.filter((obj) =>
    obj.category.includes(categoryname)
  );

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.error("Removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="categoryPage-container">
        <div className="categoryPage-headingContainer">
          <h1 className="categoryPage-title">{categoryname}</h1>
        </div>

        {loading ? (
          <div className="categoryPage-loaderContainer">
            <Loader />
          </div>
        ) : (
          <section className="categoryPage-contentSection">
            <div className="categoryPage-productContainer">
              <div className="categoryPage-productGrid">
                {filterProduct.length > 0 ? (
                  filterProduct.map((item, index) => {
                    const { id, title, price, productImageUrl, description } =
                      item;
                    return (
                      <div key={index} className="product-card">
                        <div className="product-card-image">
                          <img src={productImageUrl} alt="Product" />
                        </div>
                        <div className="product-card-content">
                          <h3 className="product-card-title">
                            {title.substring(0, 25)}
                          </h3>
                          <p className="product-card-price">₹{price}</p>
                          <p className="product-card-description">
                            {description}
                          </p>
                          <div className="product-card-actions">
                            {cartItems?.some((p) => p.id === item.id) ? (
                              <button
                                className="product-btn product-btn-details"
                                onClick={() => deleteCart(item)}
                              >
                                Delete From Cart
                              </button>
                            ) : (
                              <button
                                className="product-btn product-btn-buy"
                                onClick={() => addCart(item)}
                              >
                                Add To Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="categoryPage-noProductFound">
                    <img
                      className="categoryPage-noProductImage"
                      src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                      alt="No Product"
                    />
                    <h1 className="categoryPage-noProductText">
                      No {categoryname} product found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
