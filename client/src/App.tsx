import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Wordle from "./pages/Wordle";
import Shapes from "./pages/Shapes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wordle" element={<Wordle />} />
      <Route path="/filtering" element={<Shapes />} />
    </Routes>
  );
}

export default App;
