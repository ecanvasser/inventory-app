import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import Inventory from "./components/Inventory";
import AdminSettings from "./components/AdminSettings";
import VehicleModels from "./components/VehicleModels";
import NewModel from "./components/NewModel";
import Categories from "./components/Categories";
import NewCategory from "./components/NewCategory";
import NewProduct from "./components/NewProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/new" element={<NewProduct />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/new" element={<NewCategory />} />
        <Route path="/vehicle-models" element={<VehicleModels />} />
        <Route path="/vehicle/new" element={<NewModel />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
