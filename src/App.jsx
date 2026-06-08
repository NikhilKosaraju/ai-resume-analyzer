import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UploadResume from "./pages/UploadResume";
import Results from "./pages/Results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<UploadResume />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;