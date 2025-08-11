import { path } from "../common/path";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import Homepage from "../pages/HomePage/Homepage";
const UseRouCustom = () => {
  const route = useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: path.trangChu,
          element: <Homepage />,
        },
      ],
    },
  ]);
  return route;
};

export default UseRouCustom;
