import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import VerticalNav from "./VerticalNav";

const EditProduct = () => {
  const [product, setProduct] = useState();
  const [models, setModels] = useState();
  const [category, setCategory] = useState();
  const [error, setError] = useState();
  const [showLinks, setShowLinks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  // Fetch matching product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:8000/products/");
        const data = await response.json();
        setProduct(
          data.filter((obj) => {
            if (obj._id === params.id) {
              return obj;
            }
          })[0]
        );
      } catch (err) {
        setError(err);
      }
    };
    fetchProduct();
  }, []);

  // Fetch all vehicle model data for dropdown menu
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

  // Fetch all product categories for dropdown menu
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/product-categories/"
        );
        const data = await response.json();
        setCategory(data);
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

  // Handles form submission for updated product info
  const formSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: product._modelid,
        category: product._categoryid,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      }),
    };
    const postProduct = async () => {
      try {
        await fetch(
          `http://localhost:8000/products/edit/${params.id}`,
          requestOptions
        );
      } catch (err) {
        setError(err);
      }
    };
    postProduct();
    navigate("/inventory");
  };

  // Handles product deletion
  const formDelete = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const deleteProduct = async () => {
      try {
        await fetch(
          `http://localhost:8000/products/delete/${params.id}`,
          requestOptions
        );
      } catch (err) {
        setError(err);
      }
    };
    deleteProduct();
    navigate("/inventory");
  };

  if (models && product && category) {
    return (
      <>
        {showLinks ? (
          <div
            id="editproduct-container"
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
          <div>
            <div className="flex flex-col justify-end">
              <Navbar
                handleNav={() => {
                  setShowLinks(!showLinks);
                }}
              />
            </div>
            <div
              id="editproduct-body"
              className="flex flex-col items-center animate__animated animate__slideInLeft"
            >
              <div id="editproduct-title" className="text-4xl mt-12 font-extrabold">
                Edit Product
              </div>
              <form
                className="flex flex-col items-center gap-8 mt-10"
                onSubmit={formSubmit}
              >
                <label className="flex gap-2">
                  <div className="text-lg font-bold">Select Model:</div>
                  <select
                    id="model"
                    defaultValue={product._modelid}
                    onChange={(e) => {
                      setProduct({ ...product, _modelid: e.target.value });
                    }}
                    className="border rounded px-2"
                  >
                    {models.map((obj) => {
                      return (
                        <option key={obj._id} value={obj._id}>
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
                    defaultValue={product._categoryid}
                    onChange={(e) => {
                      setProduct({ ...product, _categoryid: e.target.value });
                    }}
                    className="border rounded px-2"
                  >
                    {category.map((obj) => {
                      return (
                        <option key={obj._id} value={obj._id}>
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
                    defaultValue={product.name}
                    onChange={(e) => {
                      setProduct({ ...product, name: e.target.value });
                    }}
                    className="border rounded px-2"
                    required
                  />
                </label>
                <label className="flex gap-2">
                  <div className="text-lg font-bold">Product Price:</div>
                  <input
                    type="number"
                    step=".01"
                    defaultValue={product.price}
                    onChange={(e) => {
                      setProduct({ ...product, price: Number(e.target.value) });
                    }}
                    id="price"
                    className="border rounded px-2"
                    required
                  />
                </label>
                <label className="flex gap-2">
                  <div className="text-lg font-bold">Product Quantity:</div>
                  <input
                    type="number"
                    id="quantity"
                    defaultValue={product.quantity}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        quantity: Number(e.target.value),
                      });
                    }}
                    className="border rounded px-2"
                    required
                  />
                </label>
                <div id="buttons" className="flex gap-4">
                  <input
                    type="submit"
                    value="Update Product"
                    className="w-max px-2 py-1 border rounded bg-[#ccffcc]"
                  />
                  <button
                    onClick={formDelete}
                    className="border bg-[#f4a4a4] rounded px-2 py-1"
                  >
                    Delete Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div
              id="inventory-container"
              className="grid grid-cols-[0.4fr_1.5fr] h-screen"
            >
              <VerticalNav />
              <div
                id="editproduct-body"
                className="flex flex-col mt-20 ml-24 animate__animated animate__slideInLeft"
              >
                <div id="editproduct-title" className="text-4xl font-extrabold">
                  Edit Product
                </div>
                <form
                  className="flex flex-col gap-8 mt-10"
                  onSubmit={formSubmit}
                >
                  <label className="flex gap-2">
                    <div className="text-lg font-bold">Select Model:</div>
                    <select
                      id="model"
                      defaultValue={product._modelid}
                      onChange={(e) => {
                        setProduct({ ...product, _modelid: e.target.value });
                      }}
                      className="border rounded px-2"
                    >
                      {models.map((obj) => {
                        return (
                          <option key={obj._id} value={obj._id}>
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
                      defaultValue={product._categoryid}
                      onChange={(e) => {
                        setProduct({ ...product, _categoryid: e.target.value });
                      }}
                      className="border rounded px-2"
                    >
                      {category.map((obj) => {
                        return (
                          <option key={obj._id} value={obj._id}>
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
                      defaultValue={product.name}
                      onChange={(e) => {
                        setProduct({ ...product, name: e.target.value });
                      }}
                      className="border rounded px-2"
                      required
                    />
                  </label>
                  <label className="flex gap-2">
                    <div className="text-lg font-bold">Product Price:</div>
                    <input
                      type="number"
                      step=".01"
                      defaultValue={product.price}
                      onChange={(e) => {
                        setProduct({
                          ...product,
                          price: Number(e.target.value),
                        });
                      }}
                      id="price"
                      className="border rounded px-2"
                      required
                    />
                  </label>
                  <label className="flex gap-2">
                    <div className="text-lg font-bold">Product Quantity:</div>
                    <input
                      type="number"
                      id="quantity"
                      defaultValue={product.quantity}
                      onChange={(e) => {
                        setProduct({
                          ...product,
                          quantity: Number(e.target.value),
                        });
                      }}
                      className="border rounded px-2"
                      required
                    />
                  </label>
                  <div id="buttons" className="flex gap-4">
                    <input
                      type="submit"
                      value="Update Product"
                      className="w-max px-2 py-1 border rounded bg-[#ccffcc]"
                    />
                    <button
                      onClick={formDelete}
                      className="border bg-[#f4a4a4] rounded px-2 py-1"
                    >
                      Delete Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
};

export default EditProduct;
