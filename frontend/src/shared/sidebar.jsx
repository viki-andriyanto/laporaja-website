import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

export default function Sidebar() {
  return (
    <nav
      className="col-md-3 col-lg-2 d-md-block bg-dark sidebar text-white"
      style={{ minWidth: "auto" }}
    >
      <div className="position-sticky pt-3 vh-100">
        <div className="sidebar-header px-3 py-4 border-bottom">
          <h4 className="mb-0">
            <i className="me-2"></i>
            {/* Bungkus logo dengan Link */}
            <Link to="/dashboard" className="d-flex align-items-center">
              <img
                src="../src/assets/logo.png"
                alt="Logo"
                style={{ height: "30px", objectFit: "contain" }}
                className="me-2"
              />
            </Link>
          </h4>
          <small className="text-muted">Administrator Panel</small>
        </div>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <a className="nav-link text-white active" href="/dashboard">
              <i className="bi bi-house-door me-2"></i>
              Beranda
            </a>
            <li className="nav-item">
              <a className="nav-link text-white" href="/Pengguna">
                <i className="bi bi-people me-2"></i>
                Pengguna
              </a>
            </li>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/Kelola-Laporan">
              <i className="bi bi-inbox me-2"></i>
              Kelola Laporan
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/riwayat-admin">
              <i className="bi bi-clock-history me-2"></i>
              Riwayat Laporan
            </a>
          </li>
          <li className="nav-item mt-4 border-top">
            <a className="nav-link text-danger mt-3" href="#">
              <i className="bi bi-box-arrow-left me-2"></i>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
