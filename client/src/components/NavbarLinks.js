import { AiOutlineHome } from "react-icons/ai";
import { FaStore } from "react-icons/fa";
import { AiOutlineTool } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import "animate.css"

const NavbarLinks = () => {
  return (
    <>
      <Link to="/">
        <div id="home" className="flex items-center gap-5">
          <IconContext.Provider value={{ size: "1.7em" }}>
            <AiOutlineHome />
          </IconContext.Provider>
          <div className="font-bold text-2xl">Home</div>
        </div>
      </Link>
      <Link to="/inventory">
        <div id="inventory" className="flex items-center gap-5">
          <IconContext.Provider value={{ size: "1.7em " }}>
            <FaStore />
          </IconContext.Provider>
          <div className="font-bold text-2xl">Inventory</div>
        </div>
      </Link>
      <Link to="/admin-settings">
        <div id="admin-settings" className="flex items-center gap-5">
          <IconContext.Provider value={{ size: "1.7em" }}>
            <AiOutlineTool />
          </IconContext.Provider>
          <div className="font-bold text-2xl">Admin Settings</div>
        </div>
      </Link>
    </>
  );
};

export default NavbarLinks