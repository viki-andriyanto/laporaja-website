export default function Header() {
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

                <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none" style={{ fontstyle: 'inter' }}>
                    <img
                        src={"src/assets/logo.png"}
                        alt=""
                        style={{ height: '30px', objectFit: 'contain' }}
                        className="me-2"
                    />
                </a>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="#" className="nav-link px-2 link-dark">Beranda</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Cara Kerja</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Testimonial</a></li>
                    <li><a href="/lapor" className="nav-link px-2 link-dark">Lapor</a></li>
                </ul>

                <div className="col-md-3 text-end">
                    <button type="button" className="btn btn-outline-primary me-3 rounded-pill">Masuk</button>
                    <button type="button" className="btn btn-primary rounded-pill">Daftar</button>
                </div>
            </header>
        </div>

    )
}