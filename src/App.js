import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Palette from "./pages/Palette";
import Save from "./pages/Save"; 
import Custom from "./pages/Custom"; 
import Login from "./pages/Login"; 
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/palette" element={<Palette />} />
        <Route path="/save" element={<Save />} /> 
        <Route path="/custom" element={<Custom />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 
      </Routes>
    </Router>
  );
}

export default App;
