import { path } from "../common/path";
import { useRoutes } from "react-router-dom";
const UseRouCustom = () => {
  const route = useRoutes([
    {
      path: path.trangChu,
      
    },
  ]);
  return route;
};

export default UseRouCustom;
