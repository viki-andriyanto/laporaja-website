import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import Lapor from "./pages/Lapor";
import RiwayatUser from "./pages/Riwayat-User"
import AuthPage from "./pages/Login/index.jsx";

function App() {

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/lapor" element={<Lapor />} />
            <Route path="/riwayat-user" element={<RiwayatUser />} />
            <Route path="/login" element={<AuthPage />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
};

export default App