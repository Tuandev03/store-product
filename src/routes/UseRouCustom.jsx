import { path } from "../common/path";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import Homepage from "../pages/HomePage/Homepage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignIn from "../pages/SignIn/SignIn";
const UseRouCustom = () => {
  const route = useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: path.sanPham,
          element: <ProductPage />,
        },
        {
          path: path.trangChu,
          element: <Homepage />,
        },
      ],
    },
    {
      path: path.dangNhap,
      element: <SignIn />,
    },
     {
      path: path.dangKy,
      element: <SignIn />,
    },
  ]);
  return route;
};

export default UseRouCustom;
