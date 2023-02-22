import { AiOutlineHome } from "react-icons/ai";
import { FaStore } from "react-icons/fa";
import { AiOutlineTool } from "react-icons/ai";
import { BsGrid1X2Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

const VerticalNav = () => {
  return (
    <div className="flex flex-col items-center pt-16 gap-8" style={{ borderRight: "1px solid lightgray" }}>
      <div className="flex flex-col gap-8">
      <div className="mb-16 w-max">
        <IconContext.Provider value={{ size: "3em" }}>
          <BsGrid1X2Fill />
        </IconContext.Provider>
      </div>
        <Link to="/">
          <div id="home" className="flex items-center gap-5 w-max">
            <IconContext.Provider value={{ size: "1.4em" }}>
              <AiOutlineHome />
            </IconContext.Provider>
            <div className="font-bold text-xl">Home</div>
          </div>
        </Link>
        <Link to="/inventory">
          <div id="inventory" className="flex items-center gap-5">
            <IconContext.Provider value={{ size: "1.4em " }}>
              <FaStore />
            </IconContext.Provider>
            <div className="font-bold text-xl">Inventory</div>
          </div>
        </Link>
        <Link to="/admin-settings">
          <div id="admin-settings" className="flex items-center gap-5">
            <IconContext.Provider value={{ size: "1.4em" }}>
              <AiOutlineTool />
            </IconContext.Provider>
            <div className="font-bold text-xl">Admin Settings</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VerticalNav;
