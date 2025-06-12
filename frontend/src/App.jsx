import { BrowserRouter, Route, Routes } from "react-router-dom";
import RiwayatAdmin from "./pages/Admin/riwayatadmin";
import KelolaLaporan from "./pages/Admin/kelolalaporan";
import Pengguna from "./pages/Admin/Pengguna";
import AdminDashboard from "./pages/admin/index";
import LandingPage from "./pages/public";
import FormLapor from "./pages/public/laporan/create";
import RiwayatUser from "./pages/public/riwayat-user/index";
// Import Auth Components
import Login from "./pages/_auth/login";
import Register from "./pages/_auth/register";
import Profil from "./shared/profil";

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            
            <Route index element={<LandingPage />} />
            <Route path="/lapor" element={<FormLapor />} />
            <Route path="/riwayat-user" element={<RiwayatUser />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/profil" element={<Profil />} />
            <Route path="/kelola-laporan" element={<KelolaLaporan />} />
            <Route path="/riwayat-admin" element={<RiwayatAdmin />} />
            <Route path="/pengguna" element={<Pengguna />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;