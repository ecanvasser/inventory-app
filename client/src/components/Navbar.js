import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ handleNav }) => {
  return (
    <nav className="flex items-center justify-end py-3 pr-5 shadow-md">
      <div id="home-icon" className="">
        <IconContext.Provider value={{ size: "3em" }}>
          <button onClick={handleNav}>
            <GiHamburgerMenu />
          </button>
        </IconContext.Provider>
      </div>
    </nav>
  );
};

export default Navbar;
