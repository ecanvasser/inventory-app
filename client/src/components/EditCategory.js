import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCategory = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/product-categories"
        );
        const data = await response.json();
        setCategory(
          data.filter((obj) => {
            if (obj._id === params.id) {
              return obj;
            }
          })[0].name
        );
      } catch (err) {
        setError(err);
      }
    };
    fetchCategory();
  }, []);

  const formUpdate = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: category }),
    };
    const updateCategory = async () => {
      try {
        await fetch(
          `http://localhost:8000/product-categories/edit/${params.id}`,
          requestOptions
        );
      } catch (err) {
        setError(err);
      }
    };
    updateCategory();
    navigate("/categories");
  };

  const formDelete = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const deleteCategory = async () => {
      try {
        await fetch(
          `http://localhost:8000/product-categories/delete/${params.id}`,
          requestOptions
        );
      } catch (err) {
        setError(err)
      }
    };
    deleteCategory();
    navigate("/categories");
  };

  if (category) {
    return (
      <div
        id="editcategory-container"
        className="grid grid-cols-[0.4fr_1.6fr] h-screen"
      >
        <Navbar />
        <div
          id="editcategory-body"
          className="py-16 pl-24 animate__animated animate__slideInDown"
        >
          <div id="editcategory-title" className="text-4xl font-extrabold">
            Edit Category
          </div>
          <form
            id="editcategory"
            onSubmit={formUpdate}
            className="mt-10 flex flex-col gap-6"
          >
            <label className="flex gap-2">
              <div className="text-lg font-bold">Name:</div>
              <input
                type="text"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
                required
                className="py-1 pl-2 border rounded"
              />
            </label>
            <div id="buttons" className="flex gap-4">
              <input
                type="submit"
                value="Update Category"
                className="w-max px-2 py-1 border rounded bg-[#ccffcc]"
              />
              <button onClick={formDelete} className="border rounded px-2 py-1">Delete</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default EditCategory;
