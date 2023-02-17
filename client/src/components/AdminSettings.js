import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const AdminSettings = () => {
  return (
    <div
      id="settings-container"
      className="grid grid-cols-[0.4fr_1.6fr] h-screen"
    >
      <Navbar />
      <div
        id="setting-links"
        className="w-10/12 py-16 pl-32 animate__animated animate__slideInRight"
      >
        <div id="section-title" className="text-4xl font-extrabold">
          Admin Settings
        </div>
        <div
          id="section-links"
          className="grid grid-cols-3 gap-5 mt-10 text-2xl font-bold"
        >
          <Link to="/vehicle-models">
            <div
              id="models"
              className="bg-[#ccffcc] flex justify-center py-10 rounded-2xl"
            >
              Vehicle Models
            </div>
          </Link>
          <div
            id="categories"
            className="bg-[#ccffcc] flex justify-center py-10 rounded-2xl"
          >
            Product Categories
          </div>
          <div
            id="add-product"
            className="bg-[#ccffcc] flex justify-center py-10 rounded-2xl"
          >
            Add New Product
          </div>
          <Link to="/vehicle/new">
            <div
              id="categories"
              className="bg-[#ccffcc] flex justify-center py-10 rounded-2xl"
            >
              Add New Model
            </div>
          </Link>
          <div
            id="categories"
            className="bg-[#ccffcc] flex justify-center py-10 rounded-2xl"
          >
            Add New Category
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
