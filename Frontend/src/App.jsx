import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSongs } from "./services/actions.js";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import "./styles/index.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
};

export default App;
