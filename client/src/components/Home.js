import Navbar from "./Navbar";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <div id="home-dashboard" className="grid grid-cols-[0.4fr_1.6fr] h-screen">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default Home;
