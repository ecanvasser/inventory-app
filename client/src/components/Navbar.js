import { AiOutlineHome } from "react-icons/ai";
import { FaStore } from "react-icons/fa";
import { AiOutlineTool } from "react-icons/ai";
import { GrApps } from "react-icons/gr";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-col gap-8 pl-16 pt-24 border-r border-[lightgray]">
      <div id="home-icon" className="mb-14">
        <IconContext.Provider value={{ size: "3em" }}>
          <GrApps />
        </IconContext.Provider>
      </div>
      <Link to="/">
        <div id="home" className="flex items-center gap-5">
          <IconContext.Provider value={{ size: "1.3em" }}>
            <AiOutlineHome />
          </IconContext.Provider>
          <div>Home</div>
        </div>
      </Link>
      <Link to="/inventory">
        <div id="inventory" className="flex items-center gap-5">
          <IconContext.Provider value={{ size: "1.3em " }}>
            <FaStore />
          </IconContext.Provider>
          <div>Inventory</div>
        </div>
      </Link>
      <Link to="/admin-settings">
        <div id="admin-settings" className="flex items-center gap-5">
          <IconContext.Provider value={{ size: "1.3em" }}>
            <AiOutlineTool />
          </IconContext.Provider>
          <div>Admin Settings</div>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
