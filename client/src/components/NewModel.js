import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import NavbarLinks from "./NavbarLinks";
import VerticalNav from "./VerticalNav";

const NewModel = () => {
  const [makes, setMakes] = useState();
  const [formMake, setFormMake] = useState();
  const [formModel, setFormModel] = useState();
  const [err, setErr] = useState();
  const [showLinks, setShowLinks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch("http://localhost:8000/makes/");
        const data = await response.json();
        setMakes(data);
      } catch (err) {
        setErr(err);
      }
    };
    fetchMakes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        make: formMake,
        model: formModel,
      }),
    };
    const postModel = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/models/new",
          requestOptions
        );
        const data = await response.json();
        console.log(data);
      } catch (err) {
        setErr(err);
      }
    };
    postModel();
  };

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

  if (makes) {
    return (
      <>
        {showLinks ? (
          <div
            id="newmodel-container"
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
            id="newmodel-container"
            className="grid grid-rows-[0.3fr_1.7fr] h-screen"
          >
            <Navbar
              handleNav={() => {
                setShowLinks(!showLinks);
              }}
            />
            <div
              id="form-container"
              className="flex flex-col items-center mt-5 animate__animated animate__slideInLeft"
            >
              <div id="section-title" className="text-4xl font-extrabold">
                New Vehicle Model
              </div>
              <form
                id="new-model"
                onSubmit={handleSubmit}
                className="mt-10 flex flex-col items-center gap-8"
              >
                <label className="flex items-center gap-5">
                  <div className="text-xl font-bold">Vehicle Make:</div>
                  <select
                    required
                    name="make"
                    onChange={(e) => {
                      setFormMake(e.target.value);
                    }}
                    className="border rounded p-1"
                  >
                    <option>-</option>
                    {makes.map((make) => {
                      return (
                        <option key={make._id} value={make._id}>
                          {make.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label className="flex gap-5 items-center">
                  <div className="text-xl font-bold">Model Name:</div>
                  <input
                    name="model"
                    className="border rounded p-1"
                    type="text"
                    placeholder="Vehicle Model"
                    minLength={2}
                    onChange={(e) => setFormModel(e.target.value)}
                    required
                  />
                </label>
                <input
                  type="submit"
                  value="Add Model"
                  className="border bg-[#ccffcc] w-max py-1 px-2 rounded"
                />
              </form>
            </div>
          </div>
        ) : (
          <div
            id="inventory-container"
            className="grid grid-cols-[0.4fr_1.5fr] h-screen"
          >
            <VerticalNav />
            <div
              id="form-container"
              className="flex flex-col mt-20 ml-24 animate__animated animate__slideInLeft"
            >
              <div id="section-title" className="text-4xl font-extrabold">
                New Vehicle Model
              </div>
              <form
                id="new-model"
                onSubmit={handleSubmit}
                className="mt-10 flex flex-col gap-8"
              >
                <label className="flex items-center gap-5">
                  <div className="text-xl font-bold">Vehicle Make:</div>
                  <select
                    required
                    name="make"
                    onChange={(e) => {
                      setFormMake(e.target.value);
                    }}
                    className="border rounded p-1"
                  >
                    <option>-</option>
                    {makes.map((make) => {
                      return (
                        <option key={make._id} value={make._id}>
                          {make.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label className="flex gap-5 items-center">
                  <div className="text-xl font-bold">Model Name:</div>
                  <input
                    name="model"
                    className="border rounded p-1"
                    type="text"
                    placeholder="Vehicle Model"
                    minLength={2}
                    onChange={(e) => setFormModel(e.target.value)}
                    required
                  />
                </label>
                <input
                  type="submit"
                  value="Add Model"
                  className="border bg-[#ccffcc] w-max py-1 px-2 rounded"
                />
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default NewModel;
