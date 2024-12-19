import React, { useContext, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/MyContext";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../../../FireBase/FirebaseConfigs";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    Email: "",
    password: "",
  });

  const userLoginhandler = async (e) => {
    e.preventDefault();
    if (userLogin.Email === "" || userLogin.password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    setLoading(true);

    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.Email,
        userLogin.password
      );
      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          toast.success("Login Successfully");
          setLoading(false);
          if (user.role === "user") {
            navigate("/user-dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        });
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("login failed");
    }
  };

  return (
    <Layout>
      <div className="login-container">
        <div className="login-form-box">
          <h1>Login</h1>
          <form>
            <div className="login-input-group">
              <input
                type="email"
                className="login-email"
                name="email"
                placeholder="Email Address"
                value={userLogin.Email}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, Email: e.target.value })
                }
              />
            </div>
            <div className="login-input-group">
              <input
                type="password"
                className="login-password"
                name="password"
                placeholder="Password"
                value={userLogin.password}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="login-btn"
              onClick={userLoginhandler}
            >
              {loading ? <Loader /> : "Login"}
            </button>
          </form>
          <p className="login-signup-link">
            Don't have an account?{" "}
            <Link to={"/signup"} className="login-signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
