export default function Footer() {
    return (
        <div className="container">
            <footer className="row py-5 my-5 border-top">
                {/* Logo dan Deskripsi */}
                <div className="col-md-5 mb-4">
                    <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
                        style={{ fontstyle: 'inter' }}>
                        <img
                            src={"src/assets/logo.png"}
                            alt=""
                            style={{ height: '30px', objectFit: 'contain' }}
                            className="mb-4"
                        />
                    </a>
                    <p className="text-dark">Sistem Pelayanan Terpadu untuk Menyampaikan Aspirasi, Masukan,
                        serta Pengaduan dari Masyarakat ke perangkat Desa
                    </p>

                    {/* Social Media Links */}
                    <div className="d-flex my-4">
                        <ul className="list-unstyled d-flex gap-3 m-0 p-0">
                            <li>
                                <i className="fa-brands fa-youtube fs-4"></i>
                            </li>
                            <li>
                                <i className="fa-brands fa-square-instagram fs-4"></i>
                            </li>
                            <li>
                                <i className="fa-brands fa-facebook fs-4"></i>
                            </li>
                        </ul>
                    </div>


                    {/* Copyright */}
                    <p className="text-muted small">
                        Copyright © 2025, Laporaja
                    </p>
                </div>

                {/* Spacer */}
                <div className="col-md-1"></div>

                {/* Useful Links */}
                <div className="col-md-3 mb-4">
                    <h5 className="fw-bold text-dark mb-3">Useful Links</h5>
                    <ul className="list-unstyled">
                        <li className="mb-2">
                            <a href="#" className="text-decoration-none text-muted">Beranda</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="text-decoration-none text-muted">Cara Kerja</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="text-decoration-none text-muted">Testimonial</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="text-decoration-none text-muted">Lapor</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div className="col-md-3 mb-4">
                    <h5 className="fw-bold text-dark mb-3">Contact Us</h5>

                    {/* Phone */}
                    <div className="d-flex align-items-start mb-3">
                        <div className="rounded-circle bg-light p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <i class="fa-solid fa-phone"></i>
                        </div>
                        <div>
                            <p className="text-muted mb-0 small">Phone No:</p>
                            <p className="text-dark mb-0 small fw-medium">+1 (109) -1812-347</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="d-flex align-items-start mb-3">
                        <div className="rounded-circle bg-light p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <i class="fa-solid fa-envelope"></i>
                        </div>
                        <div>
                            <p className="text-muted mb-0 small">Email Address:</p>
                            <p className="text-dark mb-0 small fw-medium">business@domain.com</p>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="d-flex align-items-start">
                        <div className="rounded-circle bg-light p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <i class="fa-solid fa-location-dot"></i>
                        </div>
                        <div>
                            <p className="text-dark mb-0 small fw-medium">
                                1217 new Town, 245x Town 1214 Street, United State
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}