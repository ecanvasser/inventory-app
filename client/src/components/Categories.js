import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import VerticalNav from "./VerticalNav";

const Categories = () => {
  const [categories, setCategories] = useState();
  const [err, setError] = useState();
  const [showLinks, setShowLinks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/product-categories/"
        );
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (err) {
    <div
      id="errPage-container"
      className="grid grid-cols-[0.4fr_1.6fr] h-screen"
    >
      <Navbar />
      <div
        id="err-message"
        className="flex flex-col items-center justify-center"
      >
        <div className="text-3xl font-extrabold">Something went wrong!</div>
        <div className="italic">{err}</div>
      </div>
    </div>;
  }

  if (categories) {
    return (
      <>
        {showLinks ? (
          <div
            id="categories-container"
            className="grid grid-rows-[0.3fr_1.7fr] h-screen"
          >
            <Navbar
              handleNav={() => {
                setShowLinks(!showLinks);
              }}
            />
            <div className="flex flex-col gap-10 items-center animate__animated animate__fadeInRight">
              <NavbarLinks />
            </div>
          </div>
        ) : isMobile ? (
          <div
            id="categories-container"
            className="grid grid-rows-[0.3fr_1.7fr] h-screen"
          >
            <Navbar
              handleNav={() => {
                setShowLinks(!showLinks);
              }}
            />
            <div
              id="categories-body"
              className="mt-8 flex flex-col items-center animate__animated animate__slideInLeft"
            >
              <div id="section-title" className="text-4xl font-extrabold">
                Product Categories
              </div>
              <div id="category-tiles" className="flex flex-wrap gap-4 mt-10">
                {categories.map((obj) => {
                  return (
                    <Link to={obj._id}>
                      <div
                        id="category-tile"
                        key={obj._id}
                        className="p-2 border rounded bg-[#E0FFFF]"
                      >
                        {obj.name}
                      </div>
                    </Link>
                  );
                })}
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
              id="categories-body"
              className="mt-20 ml-24 flex flex-col animate__animated animate__slideInLeft"
            >
              <div id="section-title" className="text-4xl font-extrabold">
                Product Categories
              </div>
              <div id="category-tiles" className="flex flex-wrap gap-4 mt-10">
                {categories.map((obj) => {
                  return (
                    <Link to={obj._id}>
                      <div
                        id="category-tile"
                        key={obj._id}
                        className="p-2 border rounded bg-[#E0FFFF]"
                      >
                        {obj.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default Categories;
