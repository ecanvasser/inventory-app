import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModelMessage from "./ModelMessage";
import NavbarLinks from "./NavbarLinks";
import VerticalNav from "./VerticalNav";

const EditModel = () => {
  const [vehicle, setVehicle] = useState();
  const [makes, setMakes] = useState();
  const [relatedProducts, setRelatedProducts] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState();
  const params = useParams();
  const navigate = useNavigate();

  // Fetch and filter for target vehicle model
  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch("http://localhost:8000/models/");
        const data = await response.json();
        setVehicle(
          data.filter((obj) => {
            if (obj._id === params.id) {
              return obj;
            }
          })[0]
        );
      } catch (err) {
        setError(err);
      }
    };
    fetchModel();
  }, []);

  // Fetch vehicle makes from express API
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch("http://localhost:8000/makes/");
        const data = await response.json();
        setMakes(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchMakes();
  }, []);

  // Find all products that belong to vehicle model
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products");
        const data = await response.json();
        setRelatedProducts(
          data.filter((obj) => {
            if (obj._modelid === params.id) {
              return obj;
            }
          })
        );
      } catch (err) {
        setError(err);
      }
    };
    fetchRelatedProducts();
  }, []);

  // Submits updated vehicle model
  const formSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        make: vehicle._makeid,
        model: vehicle.model,
      }),
    };
    const postModel = async () => {
      try {
        await fetch(
          `http://localhost:8000/models/edit/${params.id}`,
          requestOptions
        );
      } catch (err) {
        setError(err);
      }
    };
    postModel();
    navigate("/vehicle-models");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Controls delete and error message
  const formDelete = (e) => {
    if (relatedProducts.length < 1) {
      e.preventDefault();
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      const deleteModel = async () => {
        try {
          await fetch(
            `http://localhost:8000/models/delete/${params.id}`,
            requestOptions
          );
        } catch (err) {
          setError(err);
        }
      };
      deleteModel();
      navigate("/vehicle-models");
    } else {
      e.preventDefault();
      setShowMessage(true);
    }
  };

  if (vehicle && makes) {
    return (
      <>
        {showLinks ? (
          <div
            id="editmodel-container"
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
            id="editmodel-container"
            className="grid grid-rows-[0.3fr_1.7fr] h-screen"
          >
            <Navbar
              handleNav={() => {
                setShowLinks(!showLinks);
              }}
            />
            <div
              id="editmodel-body"
              className="flex flex-col items-center animate__animated animate__slideInLeft"
            >
              <div id="editmodel-title" className="text-4xl font-extrabold">
                Edit Vehicle Model
              </div>
              <form
                className="mt-10 flex flex-col items-center gap-8"
                onSubmit={formSubmit}
              >
                <label className="flex items-center gap-2">
                  <div className="text-lg font-bold">Make:</div>
                  <select
                    defaultValue={vehicle._makeid}
                    onChange={(e) =>
                      setVehicle({ ...vehicle, _makeid: e.target.value })
                    }
                    className="border rounded p-1"
                  >
                    {makes.map((obj) => {
                      return (
                        <option key={obj._id} id={obj.make} value={obj._id}>
                          {obj.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label className="flex gap-2">
                  <div className="text-lg font-bold">Model:</div>
                  <input
                    type="text"
                    onChange={(e) =>
                      setVehicle({ ...vehicle, model: e.target.value })
                    }
                    className="border rounded pl-2"
                    defaultValue={vehicle.model}
                    required
                  />
                </label>
                <div id="buttons" className="flex gap-4">
                  <input
                    type="submit"
                    value="Update Model"
                    className="w-max px-2 py-1 border rounded bg-[#ccffcc]"
                  />
                  <button
                    onClick={formDelete}
                    className="border bg-[#f4a4a4] rounded px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </form>
              {showMessage ? (
                <ModelMessage
                  products={relatedProducts}
                  closeMessage={() => setShowMessage(false)}
                />
              ) : null}
            </div>
          </div>
        ) : (
          <div
            id="inventory-container"
            className="grid grid-cols-[0.4fr_1.5fr] h-screen"
          >
            <VerticalNav />
            <div
              id="editmodel-body"
              className="flex flex-col mt-20 ml-24 animate__animated animate__slideInLeft"
            >
              <div id="editmodel-title" className="text-4xl font-extrabold">
                Edit Vehicle Model
              </div>
              <form
                className="mt-10 flex flex-col gap-8"
                onSubmit={formSubmit}
              >
                <label className="flex items-center gap-2">
                  <div className="text-lg font-bold">Make:</div>
                  <select
                    defaultValue={vehicle._makeid}
                    onChange={(e) =>
                      setVehicle({ ...vehicle, _makeid: e.target.value })
                    }
                    className="border rounded p-1"
                  >
                    {makes.map((obj) => {
                      return (
                        <option key={obj._id} id={obj.make} value={obj._id}>
                          {obj.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label className="flex gap-2">
                  <div className="text-lg font-bold">Model:</div>
                  <input
                    type="text"
                    onChange={(e) =>
                      setVehicle({ ...vehicle, model: e.target.value })
                    }
                    className="border rounded pl-2"
                    defaultValue={vehicle.model}
                    required
                  />
                </label>
                <div id="buttons" className="flex gap-4">
                  <input
                    type="submit"
                    value="Update Model"
                    className="w-max px-2 py-1 border rounded bg-[#ccffcc]"
                  />
                  <button
                    onClick={formDelete}
                    className="border bg-[#f4a4a4] rounded px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </form>
              {showMessage ? (
                <ModelMessage
                  products={relatedProducts}
                  closeMessage={() => setShowMessage(false)}
                />
              ) : null}
            </div>
          </div>
        )}
      </>
    );
  }
};

export default EditModel;
