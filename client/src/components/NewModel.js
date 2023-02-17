import { useState, useEffect } from "react";
import Navbar from "./Navbar";

const NewModel = () => {
  const [makes, setMakes] = useState();
  const [formMake, setFormMake] = useState();
  const [formModel, setFormModel] = useState();
  const [err, setErr] = useState();

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
      <div
        id="newmodel-container"
        className="grid grid-cols-[0.4fr_1.6fr] h-screen"
      >
        <Navbar />
        <div
          id="form-container"
          className="w-10/12 py-16 pl-32 animate__animated animate__slideInRight"
        >
          <div id="section-title" className="text-4xl font-extrabold">
            New Vehicle Model
          </div>
          <form
            id="new-model"
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-10"
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
                minLength={2}
                onChange={(e) => setFormModel(e.target.value)}
                required
              />
            </label>
            <input
              type="submit"
              className="border bg-[#ccffcc] w-1/5 py-1 rounded"
            />
          </form>
        </div>
      </div>
    );
  }
};

export default NewModel;
