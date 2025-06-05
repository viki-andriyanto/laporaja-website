import { useState } from "react";
import Footer from "../../../shared/footer";
import Header from "../../../shared/header";
import { useNavigate } from "react-router-dom";

export default function FormLapor() {
    const navigate = useNavigate();
    const [formType, setFormType] = useState("laporan");

    return (
        <>
            <Header />
            <div className="container">
                <main>
                    <div className="py-5 text-center">
                        <h2 className="mb-4">Laporkan Aspirasi dan Keluhan Anda</h2>
                        <p className="lead mb-4">
                            Hubungkan laporan Anda langsung ke pihak kelurahan atau desa secara cepat dan efisien.
                        </p>
                    </div>
                    <div className="container col-xxl-8 px-4 py-5 shadow rounded-4 col-md-7 col-lg-8">
                        <h5 className="mb-3">Pilih jenis laporan yang ingin disampaikan</h5>

                        {/* Toggle Button */}
                        <div className="d-flex justify-content-between gap-3 mb-4">
                            <button
                                type="button"
                                className={`btn flex-fill ${formType === "laporan" ? "btn-primary" : "btn-outline-dark"}`}
                                onClick={() => setFormType("laporan")}
                            >
                                Laporan
                            </button>
                            <button
                                type="button"
                                className={`btn flex-fill ${formType === "surat" ? "btn-primary" : "btn-outline-dark"}`}
                                onClick={() => setFormType("surat")}
                            >
                                Surat
                            </button>
                        </div>

                        {/* Conditional Rendering */}
                        {formType === "laporan" ? <FormLaporan navigate={navigate} /> : <FormSurat navigate={navigate} />}
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}

// Form Laporan
function FormLaporan({ navigate }) {
    return (
        <form className="needs-validation" noValidate>
            <div className="row g-3">
                <div className="col-12">
                    <label htmlFor="judul" className="form-label">Judul Laporan*</label>
                    <input type="text" className="form-control" id="judul" required />
                </div>

                <div className="col-12">
                    <label htmlFor="kategori" className="form-label">Kategori*</label>
                    <select className="form-select" id="kategori" required>
                        <option value="">Pilih Kategori Laporan</option>
                        <option value="infrastruktur">Infrastruktur</option>
                        <option value="kebersihan">Kebersihan</option>
                        <option value="keamanan">Keamanan</option>
                        <option value="administrasi">Administrasi</option>
                    </select>
                </div>

                <div className="col-12">
                    <label htmlFor="lokasi" className="form-label">Lokasi Kejadian*</label>
                    <input type="text" className="form-control" id="lokasi" placeholder="Masukkan alamat atau koordinat" required />
                </div>

                <div className="col-12">
                    <label htmlFor="deskripsi" className="form-label">Deskripsi Permasalahan</label>
                    <textarea className="form-control" id="deskripsi" rows="5" placeholder="Jelaskan permasalahan secara rinci..." />
                </div>

                <div className="col-12">
                    <label className="form-label">Foto/Video Pendukung <span className="text-muted">(Optional)</span></label>
                    <input className="form-control" type="file" accept="image/*" />
                </div>

                <div className="col-12">
                    <label className="form-label">Kontak <span className="text-muted">(Optional)</span></label>
                    <input type="text" className="form-control" />
                </div>
            </div>

            <hr className="my-4" />

            <div className="d-flex gap-2">
                <button className="col-8 btn btn-primary btn-lg w-50" type="submit">Kirim Laporan</button>
                <button
                    className="col-4 btn btn-outline-dark btn-lg w-50"
                    type="button"
                    onClick={() => navigate("/riwayat-user")}
                >
                    Lihat Riwayat Laporan
                </button>
            </div>
        </form>
    );
}

// Form Surat
function FormSurat({ navigate }) {
    return (
        <form className="needs-validation" noValidate>
            <div className="row g-3">
                <div className="col-12">
                    <label htmlFor="judul" className="form-label">Judul Surat*</label>
                    <input type="text" className="form-control" id="judul" required />
                </div>
                <div className="col-12">
                    <label htmlFor="jenisSurat" className="form-label">Jenis Surat*</label>
                    <select className="form-select" id="jenisSurat" required>
                        <option value="">Pilih Jenis Surat</option>
                        <option value="keterangan">Surat Keterangan</option>
                        <option value="pengantar">Surat Pengantar</option>
                    </select>
                </div>

                <div className="col-12">
                    <label htmlFor="keperluan" className="form-label">Keperluan*</label>
                    <textarea className="form-control" id="keperluan" rows="4" placeholder="Tuliskan keperluan Anda" required />
                </div>

                <div className="col-12">
                    <label className="form-label">Lampiran <span className="text-muted">(Opsional)</span></label>
                    <input className="form-control" type="file" accept="image/*,.pdf" />
                </div>

                <div className="col-12">
                    <label className="form-label">Kontak <span className="text-muted">(Optional)</span></label>
                    <input type="text" className="form-control" />
                </div>
            </div>

            <hr className="my-4" />

            <div className="d-flex gap-2">
                <button className="col-8 btn btn-primary btn-lg w-50" type="submit">Kirim Surat</button>
                <button
                    className="col-4 btn btn-outline-dark btn-lg w-50"
                    type="button"
                    onClick={() => navigate("/riwayat-user")}
                >
                    Lihat Riwayat Surat
                </button>
            </div>
        </form>
    );
}
