import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chores from "./pages/Chores";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chores" element={<Chores />} />
    </Routes>
  );
}