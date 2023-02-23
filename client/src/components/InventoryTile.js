import { useState } from "react";

const InventoryTile = ({ data }) => {
  const [total, setTotal] = useState(Number((data.quantity * data.price).toFixed(2)));

  return (
    <div id="product-container" className="grid grid-cols-3 sm:grid-cols-4 bg-[#D8BFD8] rounded-xl py-8 px-4">
      <div id="car-fit" className="flex flex-col items-center text-center gap-5">
        <div id="carfit-top" className="text-lg font-bold">{`${data.name}`}</div>
        <div id="carfit-btm" className="italic text-sm">{`Fits: ${data.make} ${data.model}`}</div>
      </div>
      <div id="quantity" className="flex flex-col items-center gap-5">
        <div id="title" className="text-lg font-bold">Quantity:</div>
        <div id="quantity-data" className="italic">{`${data.quantity}`}</div>
      </div>
      <div id="quantity" className="hidden sm:flex sm:flex-col items-center gap-5">
        <div id="title" className="text-lg font-bold">Price:</div>
        <div id="quantity-data" className="italic">{`$${data.price}`}</div>
      </div>
      <div id="quantity" className="flex flex-col items-center gap-5">
        <div id="title" className="text-lg font-bold">Total In-Hand:</div>
        <div id="quantity-data" className="italic">{`$${total}`}</div>
      </div>
    </div>
  );
};

export default InventoryTile;
