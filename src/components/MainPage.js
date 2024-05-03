// MainComponent.js
import React, { useState, useEffect } from "react";
import { Products } from "./Products";
import { auth } from "../utils/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const MainComponent = ({ user, setUser }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    //Getting user data after login and setting it in local storage for checking is User logged in or not
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(uid);
        setLoading(false);
        localStorage.setItem("user", uid);
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  // if user not logged in redirecting to login page
  if (!user) {
    navigate("/login");
  }
  return (
    <>
      <Products />
    </>
  );
};

export default MainComponent;
