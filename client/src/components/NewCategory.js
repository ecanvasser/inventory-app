import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import NavbarLinks from "./NavbarLinks";
import VerticalNav from "./VerticalNav";

const NewCategory = () => {
  const [newcategory, setNewCategory] = useState();
  const [apiresponse, setApiResponse] = useState();
  const [error, setError] = useState();
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

  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newcategory }),
    };
    const postCategory = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/product-categories/new",
          requestOptions
        );
        const data = await response.json();
        console.log(data);
        setApiResponse(data);
      } catch (err) {
        setError(err);
      }
    };
    postCategory();
  };

  return (
    <>
      {showLinks ? (
        <div
          id="newcategory-container"
          className="grid grid-rows-[0.3fr_1.7fr]"
        >
          <Navbar
            handleNav={() => {
              setShowLinks(!showLinks);
            }}
          />
          <div className="flex flex-col mt-8 gap-10 items-center animate__animated animate__fadeInRight">
            <NavbarLinks />
          </div>
        </div>
      ) : isMobile ? (
        <div
          id="newcategory-container"
          className="grid grid-rows-[0.3fr_1.7fr]"
        >
          <Navbar
            handleNav={() => {
              setShowLinks(!showLinks);
            }}
          />
          <div
            id="newcategory-body"
            className="flex flex-col mt-8 items-center animate__animated animate__slideInLeft"
          >
            <div id="nc-title" className="text-4xl font-extrabold">
              Add New Category
            </div>
            <form
              id="nc-form"
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-8 mt-10"
            >
              <label className="flex gap-2 font-bold text-xl">
                Category Name:
                <input
                  type="text"
                  className="border rounded pl-2 font-medium"
                  placeholder="Category"
                  onChange={handleChange}
                />
              </label>
              <input
                type="submit"
                className="w-max border py-1 px-3 rounded bg-[#ccffcc]"
              />
            </form>
          </div>
        </div>
      ) : (
        <div
          id="inventory-container"
          className="grid grid-cols-[0.4fr_1.5fr] h-screen"
        >
          <VerticalNav />
          <div
            id="newcategory-body"
            className="flex flex-col mt-20 ml-24 animate__animated animate__slideInLeft"
          >
            <div id="nc-title" className="text-4xl font-extrabold">
              Add New Category
            </div>
            <form
              id="nc-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 mt-10"
            >
              <label className="flex gap-2 font-bold text-xl">
                Category Name:
                <input
                  type="text"
                  className="border rounded pl-2 font-medium"
                  placeholder="Category"
                  onChange={handleChange}
                />
              </label>
              <input
                type="submit"
                className="w-max border py-1 px-3 rounded bg-[#ccffcc]"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewCategory;
