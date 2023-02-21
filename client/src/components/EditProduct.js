import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const [product, setProduct] = useState();
  const [models, setModels] = useState();
  const [category, setCategory] = useState();
  const [error, setError] = useState();
  const params = useParams();
  const navigate = useNavigate();

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

  if (models && product && category) {
    return (
      <div
        id="editproduct-container"
        className="grid grid-cols-[0.4fr_1.6fr] h-screen"
      >
        <Navbar />
        <div
          id="editproduct-body"
          className="w-10/12 py-16 pl-32 animate__animated animate__slideInRight"
        >
          <div id="editproduct-title" className="text-4xl font-extrabold">
            Edit Product
          </div>
          <form className="flex flex-col gap-8 mt-10" onSubmit={formSubmit}>
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
                  setProduct({ ...product, quantity: Number(e.target.value) });
                }}
                className="border rounded px-2"
                required
              />
            </label>
            <input
              type="submit"
              value="Update Product"
              className="w-max border px-2 py-1 rounded bg-[#ccffcc]"
            />
          </form>
        </div>
      </div>
    );
  }
};

export default EditProduct;
