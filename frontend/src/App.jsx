import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/index";
import Lapor from "./pages/Lapor";
import RiwayatUser from "./pages/Riwayat-User"
import AuthPage from "./pages/Login/index";
import Dashboard from "./pages/Admin/Dasboard";
import KelolaLaporan from "./pages/Admin/Kelola-Laporan";
import RiwayatAdmin from "./pages/Admin/Riwayat-Admin";

function App() {

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/lapor" element={<Lapor />} />
            <Route path="/riwayat-user" element={<RiwayatUser />} />
            <Route path="/kelola-laporan" element={<KelolaLaporan />} />
            <Route path="/riwayat-admin" element={<RiwayatAdmin />} />
            <Route path="/login" element={<AuthPage />} /> 
            <Route path="/Dashboard" element={<Dashboard />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
};

export default App