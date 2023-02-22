import Mainchart from "./Mainchart";
import "animate.css";

const Dashboard = () => {
  return (
    <main className="flex flex-col items-center text-4xl font-extrabold md:mt-24 mt-5 pb-16 animate__animated animate__slideInLeft">
      <div id="section-title" className="md:w-10/12">Dashboard</div>
      <Mainchart />
    </main>
  );
};

export default Dashboard;
