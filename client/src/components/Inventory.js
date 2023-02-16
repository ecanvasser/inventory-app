import Navbar from "./Navbar";
import "animate.css";
import InventoryTile from "./InventoryTile";
import { useState, useEffect } from "react";

const Inventory = () => {
  const [products, setProducts] = useState();
  const [makes, setMakes] = useState();
  const [err, setError] = useState();

  // Fetch all product data for inventory grid
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products/");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchProducts();
  }, []);

  // Fetch all vehicle makes for inventory filters
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch("http://localhost:8000/makes/");
        const data = await response.json();
        setMakes(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchMakes();
  }, []);

  if (err) {
    <div
      id="errPage-container"
      className="grid grid-cols-[0.4fr_1.6fr] h-screen"
    >
      <Navbar />
      <div id="err-message" className="flex flex-col items-center justify-center">
        <div className="text-3xl font-extrabold">Something went wrong!</div>
        <div className="italic">{err}</div>
      </div>
    </div>;
  }

  if (products) {
    return (
      <div
        id="inventory-container"
        className="grid grid-cols-[0.4fr_1.6fr] h-screen"
      >
        <Navbar />
        <div
          id="products"
          className="py-16 pl-24 animate__animated animate__slideInDown"
        >
          <div className="text-4xl font-extrabold">Inventory</div>
          <div id="product-filters" className="flex"></div>
          <div
            id="product-rows"
            className="mt-16 w-11/12 grid grid-cols-1 gap-4"
          >
            {products.map((obj, i) => {
              return <InventoryTile data={obj} key={obj._id} />;
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Inventory;
