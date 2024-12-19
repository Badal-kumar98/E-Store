import React, { useState, useContext } from "react";
import "./signup.css";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../FireBase/FirebaseConfigs";
import { collection, Timestamp, addDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

const Signup = () => {
  const { loading, setLoading } = useContext(MyContext);
  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const userSignuphandler = async (e) => {
    e.preventDefault();

    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userReference = collection(fireDB, "user");
      await addDoc(userReference, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      toast.success("Signup Successfully");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="signup-container">
        <div className="signup-form-box">
          <h1>Welcome!</h1>
          <p>Create your account to join us</p>
          <form onSubmit={userSignuphandler}>
            <div className="signup-input-group">
              <input
                type="text"
                className="signup-name"
                name="name"
                placeholder="Full Name"
                value={userSignup.name}
                onChange={(e) =>
                  setUserSignup({ ...userSignup, name: e.target.value })
                }
              />
            </div>
            <div className="signup-input-group">
              <input
                type="email"
                className="signup-email"
                name="email"
                placeholder="Email Address"
                value={userSignup.email}
                onChange={(e) =>
                  setUserSignup({ ...userSignup, email: e.target.value })
                }
              />
            </div>
            <div className="signup-input-group">
              <input
                type="password"
                className="signup-password"
                name="password"
                placeholder="Password"
                value={userSignup.password}
                onChange={(e) =>
                  setUserSignup({ ...userSignup, password: e.target.value })
                }
              />
            </div>
            <button type="submit" className="signup-btn">
              {loading ? <Loader /> : "Signup"}
            </button>
          </form>
          <p className="signup-login-link">
            Already have an account?{" "}
            <Link to={"/login"} className="signup-login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
