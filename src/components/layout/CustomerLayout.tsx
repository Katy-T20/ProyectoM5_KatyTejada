import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function CustomerLayout() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
