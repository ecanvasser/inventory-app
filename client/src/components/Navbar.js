import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ handleNav }) => {
  return (
    <nav className="flex justify-end pb-3 mt-4 mr-5">
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
