import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import NavbarLinks from "./NavbarLinks";
import { useState } from "react";

const Home = () => {
  const [showLinks, setShowLinks] = useState(false);

  const handleNav = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div id="home-dashboard" className="grid grid-rows-[0.3fr_1.7fr] h-screen">
      <Navbar handleNav={handleNav} />
      {showLinks ? (
        <div className="flex flex-col gap-10 items-center animate__animated animate__fadeInRight">
          <NavbarLinks />
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default Home;
