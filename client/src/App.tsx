import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Wordle from "./pages/Wordle";
import Filters from "./pages/Filters";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wordle" element={<Wordle />} />
      <Route path="/filtering" element={<Filters />} />
    </Routes>
  );
}

export default App;
