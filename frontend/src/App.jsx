import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import KelolaLaporan from "./pages/admin/KelolaLaporan.jsx";
// import Admin from "./pages/admin/index" // Uncomment jika ingin digunakan

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashboard />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route path="/admin/kelola-laporan" element={<KelolaLaporan />} />
            {/* <Route path="/books" element={<Books />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="/team" element={<Team />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;