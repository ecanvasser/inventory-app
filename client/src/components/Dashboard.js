import Mainchart from "./Mainchart";
import "animate.css";

const Dashboard = () => {
  return (
    <main className="text-4xl font-extrabold py-16 pl-32 animate__animated animate__fadeInRight">
      <div id="section-title">Dashboard</div>
      <Mainchart />
    </main>
  );
};

export default Dashboard;
