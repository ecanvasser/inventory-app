import { Link } from "react-router-dom";

const Middleicons = () => {
  return (
    <>
      <Link to="/inventory">
        <div
          id="left-iconbox"
          className="bg-[#8FBC8F] flex flex-col items-center text-4xl font-bold px-10 py-16 rounded-2xl"
        >
          Inventory
        </div>
      </Link>
      <Link to="/admin-settings">
        <div
          id="right-iconbox"
          className="bg-[#E9967A] flex flex-col items-center text-4xl font-bold px-10 py-16 rounded-2xl"
        >
          Admin Settings
        </div>
      </Link>
    </>
  );
};

export default Middleicons;
