import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import NavbarLinks from "./NavbarLinks";
import VerticalNav from "./VerticalNav";
import { useState, useEffect } from "react";

const Home = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleNav = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div
        id="home-dashboard"
        className="grid grid-rows-[0.3fr_1.7fr] md:grid-cols-[0.4fr_1.6fr] md:grid-rows-none h-screen"
      >
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
  }

  return (
    <div className="grid grid-cols-[0.4fr_1.5fr]">
      <VerticalNav />
      <Dashboard />
    </div>
  );
};

export default Home;
