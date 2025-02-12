import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Wordle from './pages/Wordle';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/wordle" element={<Wordle/>} />
    </Routes>
  );
}

export default App;
