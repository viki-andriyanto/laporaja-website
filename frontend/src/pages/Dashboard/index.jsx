import Footer from "../../shared/footer";
import Header from "../../shared/header";

export default function Dashboard() {

    return (
        <>
            <Header />

        {/* Hero Section */}
        <header className="bg-primary text-white text-center py-5">
            <div className="container">
            <h1 className="display-5 fw-bold">Layanan Aspirasi dan Pengaduan Online Rakyat</h1>
            <p className="lead mt-3">Sampaikan laporan Anda langsung kepada instansi pemerintah berwenang.</p>
            <a href="#lapor" className="btn btn-success btn-lg mt-">Lapor</a>
            </div>
        </header>

        {/* Tentang Section */}
        <section className="py-5">
            <div className="container d-flex flex-column flex-lg-row align-items-center">
            <div className="col-lg-6">
                <h2 className="fw-bold mb-3">Laporaja</h2>
                <p>
                Merupakan sistem layanan pengaduan masyarakat yang ditujukan bagi warga desa atau kelurahan untuk
                menyampaikan aspirasi, keluhan, atau permintaan surat keterangan secara online. Melalui platform ini,
                warga dapat menyampaikan laporan tanpa harus datang langsung ke kantor kelurahan. Setiap laporan akan
                diproses oleh petugas dan statusnya dapat dipantau secara real-time.
                </p>
            </div>
            <div className="col-lg-6 text-center">
                <img src="../src/assets/illustrasi.png" alt="Ilustrasi" className="img-fluid mt-4 mt-lg-0" />
            </div>
            </div>
        </section>

        {/* Cara Kerja Section */}
        <section id="caraKerja" className="py-5 bg-light">
            <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                <img src="../src/assets/cara-kerja.png" alt="Cara Kerja" className="img-fluid" />
                </div>
                <div className="col-lg-6">
                <h3 className="fw-bold mb-4">Cara Kerja</h3>
                <ol className="list-unstyled fs-5">
                    <li><strong>1. User Login</strong> <br /> Pengguna Login</li>
                    <li><strong>2. Open Lapor</strong> <br /> Pengguna Membuka Lapor</li>
                    <li><strong>3. Proses Lapor</strong> <br /> Tim Helpdesk Laporaja Memproses Lapor</li>
                    <li><strong>4. Notifikasi</strong> <br /> Pengguna Mendapatkan Notifikasi Jawaban Lapor</li>
                    <li><strong>5. Close Lapor</strong> <br /> Lapor Ditutup dan Berhasil D</li>
                </ol>
                </div>
            </div>
            </div>
        </section>

         {/* Testimonial Section */}
        <section id="testimonial" className="py-5" style={{ background: 'linear-gradient(to bottom, #3B82F6, #ebf8e1)' }}>
            <div className="container text-center">
            <h3 className="fw-bold mb-5 text-white">Testimonial</h3>
            <div className="row justify-content-center">
                {[
                {
                    name: "Eora",
                    role: "Bupati",
                    img: "../src/assets/eora.png",
                    text: [
                    "lorem ipsum lorem ipsum",
                    "lorem ipsum lorem ipsum",
                    "lorem ipsum lorem ipsum"
                    ]
                },
                {
                    name: "Rizal",
                    role: "Kementerian Agama",
                    img: "../src/assets/rizal.png",
                    text: [
                    "lorem ipsum lorem ipsum",
                    "lorem ipsum lorem ipsum",
                    "lorem ipsum lorem ipsum"
                    ]
                },
                {
                    name: "Elon",
                    role: "Masyarakat Umum",
                    img: "../src/assets/elon.png",
                    text: [
                    "lorem ipsum lorem ipsum",
                    "lorem ipsum lorem ipsum",
                    "lorem ipsum lorem ipsum"
                    ]
                }
                ].map((item, idx) => (
                <div className="col-md-4 mb-4" key={idx}>
                    <div className="card p-4 h-100 border-0 rounded-4 shadow" style={{ backgroundColor: "#fff" }}>
                    <div className="mb-3">
                        <img src="../src/assets/quote-icon.svg" alt="quote icon" width="48" height="48" />
                    </div>
                    <div className="text-start mb-4">
                        {item.text.map((line, i) => (
                        <p key={i} className="mb-1 text-dark">{line}</p>
                        ))}
                    </div>
                    <div className="d-flex align-items-center mt-auto">
                        <img
                        src={item.img}
                        alt={item.name}
                        className="rounded-circle me-3"
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        />
                        <div className="text-start">
                        <h6 className="mb-0 fw-bold text-dark">{item.name}</h6>
                        <small className="text-muted">{item.role}</small>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>


        <Footer />

      </>
    )
}