import { BrowserRouter, Route, Routes } from "react-router-dom";
import RiwayatAdmin from "./pages/Admin/riwayatadmin";
import KelolaLaporan from "./pages/Admin/kelolalaporan";
import Pengguna from "./pages/Admin/Pengguna";
import AdminDashboard from "./pages/Admin/index";
import LandingPage from "./pages/public";
import FormLapor from "./pages/public/laporan/create";
import RiwayatUser from "./pages/public/riwayatuser/index";
// Import Auth Components
import Login from "./pages/_auth/login";
import Register from "./pages/_auth/register";
import Profil from "./shared/profil";
import PublicLayout from "./layouts/public";

function App() {
  return (
    <>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="/lapor" element={<FormLapor />} />
              <Route path="/riwayat" element={<RiwayatUser />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profil" element={<Profil />} />
            
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