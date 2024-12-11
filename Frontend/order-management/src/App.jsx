import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Router
import Header from "./components/Header";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";
import ManageOrders from "./pages/ManageOrders";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/manage-orders" element={<ManageOrders />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<CreateOrder />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
