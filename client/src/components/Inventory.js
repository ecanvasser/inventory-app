import Navbar from "./Navbar";
import "animate.css";
import { useState, useEffect } from "react";

const Inventory = () => {
  const [products, setProducts] = useState();
  const [err, setError] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products/");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Something went bad!')
      }
    };
    fetchProducts();
  }, []);

  if (err) {
    return err
  }

  return (
    <div
      id="inventory-container"
      className="grid grid-cols-[0.4fr_1.6fr] h-screen"
    >
      <Navbar />
      <div
        id="products"
        className="py-16 pl-32 animate__animated animate__slideInDown"
      >
        <div className="text-4xl font-extrabold">Inventory</div>
        <div id="product-rows" className="mt-16">
          Content
        </div>
      </div>
    </div>
  );
};

export default Inventory;
