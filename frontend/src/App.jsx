import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/Login/index";
import RiwayatAdmin from "./pages/admin/riwayatadmin";
import KelolaLaporan from "./pages/admin/kelolalaporan";
import Pengguna from "./pages/Admin/Pengguna";
import AdminDashboard from "./pages/admin/index";
import LandingPage from "./pages/public";
import FormLapor from "./pages/public/laporan/create";
import RiwayatUser from "./pages/public/riwayat-user/index";

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/lapor" element={<FormLapor />} />
            <Route path="/riwayat-user" element={<RiwayatUser />} />
            <Route path="/kelola-laporan" element={<KelolaLaporan />} />
            <Route path="/riwayat-admin" element={<RiwayatAdmin />} />
            <Route path="/pengguna" element={<Pengguna />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
