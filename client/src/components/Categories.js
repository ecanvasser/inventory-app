import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState();
  const [err, setError] = useState();

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
      <div
        id="categories-container"
        className="grid grid-cols-[0.4fr_1.6fr] h-screen"
      >
        <Navbar />
        <div
          id="categories-body"
          className="py-16 pl-24 animate__animated animate__slideInDown"
        >
          <div id="section-title" className="text-4xl font-extrabold">
            Product Categories
          </div>
          <div id="category-tiles" className="flex flex-wrap gap-4 mt-10">
            {categories.map((obj) => {
              return (
                <div
                  id="category-tile"
                  key={obj._id}
                  className="p-2 border rounded bg-[#E0FFFF]"
                >
                  {obj.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Categories;
