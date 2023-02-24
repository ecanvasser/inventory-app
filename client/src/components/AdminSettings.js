import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import VerticalNav from "./VerticalNav";
import { useState, useEffect } from "react";

const AdminSettings = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {showLinks ? (
        <div id="settings-container" className="grid grid-rows-[0.3fr_1.7fr]">
          <Navbar handleNav={() => setShowLinks(!showLinks)} />
          <div className="flex flex-col gap-10 items-center animate__animated animate__fadeInRight">
            <NavbarLinks />
          </div>
        </div>
      ) : isMobile ? (
        <div id="settings-container" className="grid grid-rows-[0.3fr_1.7fr]">
          <Navbar handleNav={() => setShowLinks(!showLinks)} />
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
              className="flex flex-col sm:grid sm:grid-cols-2 sm:px-10 gap-5 md:grid-cols-3 mt-10 text-2xl font-bold"
            >
              <Link to="/vehicle-models" className="flex justify-center">
                <div
                  id="models"
                  className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
                >
                  Vehicle Models
                </div>
              </Link>
              <Link to="/categories" className="flex justify-center">
                <div
                  id="categories"
                  className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
                >
                  Product Categories
                </div>
              </Link>
              <Link to="/inventory/new" className="flex justify-center">
                <div
                  id="add-product"
                  className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
                >
                  Add New Product
                </div>
              </Link>
              <Link to="/vehicle/new" className="flex justify-center">
                <div
                  id="categories"
                  className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
                >
                  Add New Model
                </div>
              </Link>
              <Link to="/categories/new" className="flex justify-center">
                <div
                  id="categories"
                  className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
                >
                  Add New Category
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div
          id="inventory-container"
          className="grid grid-cols-[0.4fr_1.5fr] h-screen"
        >
          <VerticalNav />
          <div
            id="setting-links"
            className="mt-20 px-12 flex flex-col animate__animated animate__slideInLeft"
          >
            <div
              id="section-title"
              className="text-4xl ml-10 font-extrabold"
            >
              Admin Settings
            </div>
            <div
              id="section-links"
              className=" sm:grid sm:grid-cols-2 sm:px-10 gap-5 md:grid-cols-3 mt-10 text-2xl font-bold"
            >
              <Link to="/vehicle-models" className="flex">
                <div
                  id="models"
                  className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
                >
                  Vehicle Models
                </div>
              </Link>
              <Link to="/categories" className="flex">
                <div
                  id="categories"
                  className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
                >
                  Product Categories
                </div>
              </Link>
              <Link to="/inventory/new" className="flex">
                <div
                  id="add-product"
                  className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
                >
                  Add New Product
                </div>
              </Link>
              <Link to="/vehicle/new" className="flex">
                <div
                  id="categories"
                  className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
                >
                  Add New Model
                </div>
              </Link>
              <Link to="/categories/new" className="flex">
                <div
                  id="categories"
                  className="bg-[#ccffcc] flex justify-center w-[400px] py-10 rounded-2xl"
                >
                  Add New Category
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSettings;
