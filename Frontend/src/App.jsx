import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSongs } from "./services/actions.js";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import "./styles/index.css";
import Loader from "./components/Loader.jsx";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(loaderTimeout);
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <div style={{ display: loading ? "none" : "block" }}>
        <Navbar />
        <Home />
      </div>
    </div>
  );
};

export default App;
