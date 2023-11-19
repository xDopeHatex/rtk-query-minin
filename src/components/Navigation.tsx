import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
        <h3 className="font-bold">Github Search</h3>
        <span>
          <Link to="/">Home</Link>
          <Link to="/favourities">Favourities</Link>
        </span>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
