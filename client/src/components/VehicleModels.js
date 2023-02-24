import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarLinks from "./NavbarLinks";
import VerticalNav from "./VerticalNav";

const VehicleModels = () => {
  const [models, setModels] = useState();
  const [err, setErr] = useState();
  const [showLinks, setShowLinks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://localhost:8000/models/");
        const data = await response.json();
        setModels(data);
      } catch (err) {
        setErr(err);
      }
    };
    fetchModels();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (err) {
    <div
      id="errPage-container"
      className="grid grid-cols-[0.4fr_1.6fr] h-screen"
    >
      <Navbar />
      <div
        id="err-message"
        className="flex flex-col items-center justify-center"
      >
        <div className="text-3xl font-extrabold">Something went wrong!</div>
        <div className="italic">{err}</div>
      </div>
    </div>;
  }

  if (models) {
    return (
      <>
        {showLinks ? (
          <div
            id="models-container"
            className="grid grid-rows-[0.3fr_1.7fr] h-screen"
          >
            <Navbar
              handleNav={() => {
                setShowLinks(!showLinks);
              }}
            />
            <div className="flex flex-col gap-10 items-center animate__animated animate__fadeInRight">
              <NavbarLinks />
            </div>
          </div>
        ) : isMobile ? (
          <div
          id="models-container"
          className="grid grid-rows-[0.3fr_1.7fr] h-screen"
        >
          <Navbar
            handleNav={() => {
              setShowLinks(!showLinks);
            }}
          />
          <div
            id="models-body"
            className="flex flex-col items-center animate__animated animate__slideInLeft"
          >
            <div id="section-title" className="text-4xl font-extrabold">
              Vehicle Models
            </div>
            <div id="model-tiles" className="mt-16 flex flex-col sm:flex-row gap-16">
              <div id="audi-models" className="flex flex-col items-center">
                <div id="audi-title" className="font-bold text-2xl mb-4">
                  Audi Models
                </div>
                <div id="audimodels-grid" className="flex flex-wrap gap-5">
                  {models.map((obj) => {
                    if (obj.make === "Audi") {
                      return (
                        <Link key={obj._id} to={`/vehicle/${obj._id}`}>
                          <div
                            id="model-tile"
                            className="bg-[#E0FFFF] p-2 border rounded-xl"
                          >
                            {obj.make} {obj.model}
                          </div>
                        </Link>
                      );
                    }
                  })}
                </div>
              </div>
              <div id="vw-models" className="flex flex-col items-center">
                <div id="vw-title" className="font-bold text-2xl mb-4">
                  Volkswagen Models
                </div>
                <div id="vwmodels-grid" className="flex flex-wrap gap-5">
                  {models.map((obj) => {
                    if (obj.make === "Volkswagen") {
                      return (
                        <Link key={obj._id} to={`/vehicle/${obj._id}`}>
                          <div
                            id="model-tile"
                            className="bg-[#E0FFFF] p-2 border rounded-xl"
                          >
                            {obj.make} {obj.model}
                          </div>
                        </Link>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : (
          <div
            id="inventory-container"
            className="grid grid-cols-[0.4fr_1.5fr] h-screen"
          >
            <VerticalNav />
            <div
            id="models-body"
            className="flex flex-col mt-20 ml-24 animate__animated animate__slideInLeft"
          >
            <div id="section-title" className="text-4xl font-extrabold">
              Vehicle Models
            </div>
            <div id="model-tiles" className="mt-16 flex flex-col sm:flex-row md:flex-col gap-16">
              <div id="audi-models" className="flex flex-col">
                <div id="audi-title" className="font-bold text-2xl mb-4">
                  Audi Models
                </div>
                <div id="audimodels-grid" className="flex flex-wrap gap-5">
                  {models.map((obj) => {
                    if (obj.make === "Audi") {
                      return (
                        <Link key={obj._id} to={`/vehicle/${obj._id}`}>
                          <div
                            id="model-tile"
                            className="bg-[#E0FFFF] p-2 border rounded-xl"
                          >
                            {obj.make} {obj.model}
                          </div>
                        </Link>
                      );
                    }
                  })}
                </div>
              </div>
              <div id="vw-models" className="flex flex-col">
                <div id="vw-title" className="font-bold text-2xl mb-4">
                  Volkswagen Models
                </div>
                <div id="vwmodels-grid" className="flex flex-wrap gap-5">
                  {models.map((obj) => {
                    if (obj.make === "Volkswagen") {
                      return (
                        <Link key={obj._id} to={`/vehicle/${obj._id}`}>
                          <div
                            id="model-tile"
                            className="bg-[#E0FFFF] p-2 border rounded-xl"
                          >
                            {obj.make} {obj.model}
                          </div>
                        </Link>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
      </>
    );
  }
};

export default VehicleModels;
