import UseRouCustom from "./routes/UseRouCustom";
const App = () => {
  const myRoutes = UseRouCustom();
  return <div>{myRoutes}</div>;
};

export default App;
