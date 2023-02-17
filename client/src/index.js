import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import Inventory from "./components/Inventory";
import AdminSettings from "./components/AdminSettings";
import VehicleModels from "./components/VehicleModels";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/vehicle-models" element={<VehicleModels />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
