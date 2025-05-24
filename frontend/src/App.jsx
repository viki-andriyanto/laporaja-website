import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import KelolaLaporan from "./pages/Kelola-Laporan";
import Lapor from "./pages/Lapor";
import RiwayatUser from "./pages/Riwayat-User"

function App() {

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/kelola-laporan" element={<KelolaLaporan />} />
            <Route path="/lapor" element={<Lapor />} />
            <Route path="/riwayat-user" element={<RiwayatUser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
};

export default App