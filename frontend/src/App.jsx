import { BrowserRouter, Route, Router, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"

import Lapor from "./pages/Lapor"

function App() {

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/Lapor" element={<Lapor />} />
            
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
};

export default App
