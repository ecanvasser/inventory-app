import Navbar from "./Navbar";
import { useState } from "react";

const NewCategory = () => {
  const [newcategory, setNewCategory] = useState();
  const [apiresponse, setApiResponse] = useState();
  const [error, setError] = useState();

  const handleChange = (e) => {
    setNewCategory(e.target.value);
  }
  
  const handleSubmit = () => {
    const requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name: newcategory})
    }
    const postCategory = async () => {
        try {
            const response = await fetch("http://localhost:8000/product-categories/new", requestOptions);
            const data = await response.json();
            console.log(data);
            setApiResponse(data);
        } catch (err) {
            setError(err);
        }
    }
    postCategory();
  }
  
    return (
    <div
      id="newcategory-container"
      className="grid grid-cols-[0.4fr_1.6fr] h-screen"
    >
      <Navbar />
      <div
        id="newcategory-body"
        className="py-16 pl-24 animate__animated animate__slideInDown"
      >
        <div id="nc-title" className="text-4xl font-extrabold">
          Add New Category
        </div>
        <form id="nc-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
          <label className="flex gap-2 font-bold text-xl">
            Category Name:
            <input
              type="text"
              className="border rounded font-medium"
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
  );
};

export default NewCategory;
