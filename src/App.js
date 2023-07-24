import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
import Cryptocurrencies from "./Components/Cryptocurrencies";
import News from "./Components/News";
import CryptoDetails from "./Components/CryptoDetails";
import Exchanges from "./Components/Exchanges";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router basename="/">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route
              exact
              path="/cryptocurrencies"
              element={<Cryptocurrencies />}
            />
            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route exact path="/exchanges" element={<Exchanges />} />
            <Route exact path="/news" element={<News />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
