import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import { useState } from "react";

const AdminSettings = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div id="settings-container" className="grid grid-rows-[0.3fr_1.7fr]">
      <Navbar handleNav={() => setShowLinks(!showLinks)} />
      {showLinks ? (
        <div className="flex flex-col gap-10 items-center animate__animated animate__fadeInRight">
          <NavbarLinks />
        </div>
      ) : (
        <div
          id="setting-links"
          className="mt-8  animate__animated animate__slideInLeft"
        >
          <div
            id="section-title"
            className="text-4xl flex justify-center font-extrabold"
          >
            Admin Settings
          </div>
          <div
            id="section-links"
            className="flex flex-col items-center gap-5 mt-10 text-2xl font-bold"
          >
            <Link to="/vehicle-models">
              <div
                id="models"
                className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
              >
                Vehicle Models
              </div>
            </Link>
            <Link to="/categories">
              <div
                id="categories"
                className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
              >
                Product Categories
              </div>
            </Link>
            <Link to="/inventory/new">
              <div
                id="add-product"
                className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
              >
                Add New Product
              </div>
            </Link>
            <Link to="/vehicle/new">
              <div
                id="categories"
                className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
              >
                Add New Model
              </div>
            </Link>
            <Link to="/categories/new">
              <div
                id="categories"
                className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
              >
                Add New Category
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
