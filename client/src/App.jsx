import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Translator from "./pages/Translator";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/translator" element={<Translator />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;