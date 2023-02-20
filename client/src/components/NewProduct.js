import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const NewProduct = () => {
  const [makes, setMakes] = useState();
  const [formCapture, setFormCapture] = useState();
  const [models, setModels] = useState();
  const [categories, setCategories] = useState();
  const [error, setError] = useState();

  // Fetch vehicle make data from express API
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

  // Fetch vehicle models from express API
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://localhost:8000/models/");
        const data = await response.json();
        setModels(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchModels();
  }, []);

  // Fetch product categories from express API
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

  // Create body object within state for POST request
  const handleFormCapture = (e) => {
    setFormCapture(
      formCapture === undefined
        ? { [e.target.id]: e.target.value }
        : { ...formCapture, [e.target.id]: e.target.value }
    );
  };

  const formSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formCapture),
    };
    const postProduct = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/products/new",
          requestOptions
        );
        const data = await response.json();
        console.log(data);
      } catch (err) {
        setError(err);
      }
    };
    postProduct();
  };

  if (makes && models && categories) {
    return (
      <div
        id="newproduct-container"
        className="grid grid-cols-[0.4fr_1.6fr] h-screen"
      >
        <Navbar />
        <div
          id="newproduct-body"
          className="w-10/12 py-16 pl-32 animate__animated animate__slideInRight"
        >
          <div id="section-title" className="text-4xl font-extrabold">
            Add New Product
          </div>
          <div id="newproduct-form" className="mt-10">
            <form className="flex flex-col gap-8" onSubmit={formSubmit}>
              <label className="flex gap-2">
                <div className="text-lg font-bold">Select Model:</div>
                <select
                  id="model"
                  className="border rounded px-2"
                  onChange={handleFormCapture}
                >
                  <option>-</option>
                  {models.map((obj) => {
                    return (
                      <option value={obj._id} key={obj._id}>
                        {obj.make} {obj.model}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label className="flex gap-2">
                <div className="text-lg font-bold">Select Category:</div>
                <select
                  id="category"
                  className="border rounded px-2"
                  onChange={handleFormCapture}
                >
                  <option>-</option>
                  {categories.map((obj) => {
                    return (
                      <option value={obj._id} key={obj._id}>
                        {obj.name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label className="flex gap-2">
                <div className="text-lg font-bold">Product Name:</div>
                <input
                  type="text"
                  id="name"
                  onChange={handleFormCapture}
                  className="border rounded px-2"
                  placeholder="Product Name"
                  required
                />
              </label>
              <label className="flex gap-2">
                <div className="text-lg font-bold">Product Price:</div>
                <input
                  type="number"
                  step=".01"
                  id="price"
                  onChange={handleFormCapture}
                  className="border rounded px-2"
                  placeholder="32.99, 8.50, 79.95, etc"
                  required
                />
              </label>
              <label className="flex gap-2">
                <div className="text-lg font-bold">Product Quantity:</div>
                <input
                  type="number"
                  id="quantity"
                  onChange={handleFormCapture}
                  className="border rounded px-2"
                  placeholder="Quantity in-stock"
                  required
                />
              </label>
              <input
                type="submit"
                value="Add Product"
                className="w-max border px-2 py-1 rounded bg-[#ccffcc]"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default NewProduct;
