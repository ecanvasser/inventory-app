import { MdOutlineClose } from "react-icons/md";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const CategoryMessage = ({ products, closeMessage }) => {
  return (
    <div
      id="message-container"
      className="border-2 border-[#ff3333] bg-[#ffe6e6] rounded-xl w-10/12 px-4 py-2 mt-8 animate__animated animate__fadeIn"
    >
      <div id="error-text" className="flex flex-col">
        <div
          id="title"
          className="flex items-center justify-between font-bold text-md"
        >
          Not so fast!
          <IconContext.Provider value={{ size: "1.4em" }}>
            <button onClick={closeMessage}>
              <MdOutlineClose />
            </button>
          </IconContext.Provider>
        </div>
        <div id="message" className="text-md mt-1">
          Before you delete this category, you need to delete these products:
        </div>
        <ul className="pl-10 mt-2">
          {products.map((obj) => (
            <Link to={`/inventory/${obj._id}`}>
              <li key={obj._id} className="flex items-center gap-1 font-semibold">
                - <div className="underline italic">{obj.name} - {obj.make} {obj.model}</div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryMessage;
