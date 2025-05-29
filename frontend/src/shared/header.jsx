import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

export default function Header() {
    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <img
                        src="../src/assets/logo.png"
                        alt="Logo"
                        style={{ height: '30px', objectFit: 'contain' }}
                        className="me-2"
                    />
                </Link>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <Link 
                            to="/" 
                            className="nav-link px-2 link-dark"
                            onClick={() => {
                                if (window.location.pathname === '/') {
                                    window.location.reload();
                                }
                            }}
                        >
                            Beranda
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="nav-link px-2 link-dark"
                            onClick={(e) => {
                                e.preventDefault();
                                handleScroll('caraKerja');
                            }}
                        >
                            Cara Kerja
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="nav-link px-2 link-dark"
                            onClick={(e) => {
                                e.preventDefault();
                                handleScroll('testimonial');
                            }}
                        >
                            Testimonial
                        </Link>
                    </li>

                    {/* Dropdown */}
                    <li>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-link px-2 link-dark border-0">
                                Lapor
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/admin/Kelola-laporan">
                                    Kelola Laporan
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to="/admin/Riwayat-Admin">
                                    Riwayat Laporan
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>

                <div className="col-md-3 text-end">
                    <Link to="/login?view=login" className="btn btn-outline-primary me-3 rounded-pill">
                        Masuk
                    </Link> 
                    <Link to="/login?view=register" className="btn btn-primary rounded-pill">
                        Daftar
                    </Link>
                </div>
            </header>
        </div>
    );
}