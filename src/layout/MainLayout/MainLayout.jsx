import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import "./MainLayout.scss";
const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="MainLayout">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
