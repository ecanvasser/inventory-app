import { Link } from "react-router-dom";

const Bottomicons = () => {
  return (
    <>
      <Link to="/inventory/new">
        <div
          id="left-iconbox"
          className="bg-[#FFFACD] flex flex-col items-center text-4xl font-bold px-10 py-16 rounded-2xl"
        >
          Add New Product
        </div>
      </Link>
      <Link to="/vehicle/new">
        <div
          id="right-iconbox"
          className="bg-[#E0FFFF] flex flex-col items-center text-4xl font-bold px-10 py-16 rounded-2xl"
        >
          Add New Model
        </div>
      </Link>
    </>
  );
};

export default Bottomicons;
