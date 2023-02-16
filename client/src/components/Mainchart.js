import Middleicons from "./Middleicons";
import Bottomicons from "./Bottomicons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { MdOutlineMonetizationOn } from "react-icons/md";

const Mainchart = () => {
  return (
    <>
      <div
        id="main-chart"
        className="grid grid-cols-3 w-10/12 bg-[#FFEBCD] mt-10 px-10 py-16 rounded-2xl"
      >
        <div id="total-products" className="flex flex-col gap-3">
          <AiOutlineShoppingCart />
          <div className="text-base font-normal mt-5">Total Products</div>
          <div className="text-4xl font-bold">18</div>
          <div className="text-sm font-normal italic">All categories</div>
        </div>
        <div id="total-categories" className="flex flex-col gap-3">
          <BiCategory />
          <div className="text-base font-normal mt-5">Total Categories</div>
          <div className="text-4xl font-bold">5</div>
          <div className="text-sm font-normal italic">All car models</div>
        </div>
        <div id="total-inventory" className="flex flex-col gap-3">
          <MdOutlineMonetizationOn />
          <div className="text-base font-normal mt-5">Total Inventory</div>
          <div className="text-4xl font-bold">$24,855</div>
          <div className="text-sm font-normal italic">Entire store</div>
        </div>
      </div>
      <div id="middle-icons" className="w-10/12 grid grid-cols-2 gap-5 mt-5">
        <Middleicons />
      </div>
      <div id="bottom-icons" className="w-10/12 grid grid-cols-2 gap-5 mt-5">
        <Bottomicons />
      </div>
    </>
  );
};

export default Mainchart;