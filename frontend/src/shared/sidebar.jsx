import { NavLink, Link } from "react-router-dom"; // ganti NavLink untuk active state
import { Dropdown } from "react-bootstrap";

export default function Sidebar() {
  return (
    <nav
      className="col-md-3 col-lg-2 d-md-block bg-dark text-white sidebar"
      style={{ minWidth: "auto" }}
    >
      <div className="position-sticky pt-3 vh-100">
        <div className="sidebar-header px-3 py-4 border-bottom">
          <Link
            to="/dashboard"
            className="d-flex align-items-center text-white text-decoration-none"
          >
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              style={{ height: 30 }}
              className="me-2"
            />
          </Link>
        </div>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/dashboard">
              <i className="bi bi-house-door me-2" /> Beranda
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/pengguna">
              <i className="bi bi-people me-2" /> Pengguna
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/kelola-laporan">
              <i className="bi bi-inbox me-2" /> Kelola Laporan
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/riwayat-admin">
              <i className="bi bi-clock-history me-2" /> Riwayat Laporan
            </NavLink>
          </li>

          <li className="nav-item mt-4 border-top pt-3">
            <Link
              className="nav-link text-danger"
              to="/login"
              onClick={() => localStorage.removeItem("token")}
            >
              <i className="bi bi-box-arrow-left me-2" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
