import Footer from "../../shared/footer";
import Header from "../../shared/header";
import { useNavigate } from "react-router-dom";

export default function Lapor() {
    const navigate = useNavigate();
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
                        <form className="needs-validation" noValidate>
                            <div className="row g-3">
                                <div className="d-flex justify-content-between gap-3 mb-4">
                                    <button type="button" className="btn btn-outline-dark flex-fill">
                                        Laporan
                                    </button>
                                    <button type="button" className="btn btn-outline-dark flex-fill">
                                        Surat
                                    </button>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="username" className="form-label text-bold">
                                        Judul Laporan*
                                    </label>
                                    <div className="input-group has-validation">
                                        <input type="text" className="form-control" id="username" required />
                                        <div className="invalid-feedback">Berikan judul laporan yang valid.</div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="kategori" className="form-label">
                                        Kategori*
                                    </label>
                                    <select className="form-select" id="kategori" name="kategori" required>
                                        <option value="">Pilih Kategori Laporan</option>
                                        <option value="infrastruktur">Infrastruktur</option>
                                        <option value="kebersihan">Kebersihan</option>
                                        <option value="keamanan">Keamanan</option>
                                        <option value="administrasi">Administrasi</option>
                                    </select>
                                    <div className="invalid-feedback">Silakan pilih kategori yang valid.</div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="lokasi" className="form-label">
                                        Lokasi Kejadian*
                                    </label>
                                    <input type="text" className="form-control" id="lokasi" placeholder="Masukan alamat atau koordinat" required />
                                    <div className="invalid-feedback">Silahkan tulis lokasi kejadian yang valid</div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="deskripsi" className="form-label">
                                        Deskripsi Permasalahan
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="deskripsi"
                                        rows="5"
                                        placeholder="Jelaskan permasalahan secara rinci..."
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="" className="form-label">
                                        Foto/Video Pendukung <span className="text-muted">(Optional)</span>
                                    </label>
                                    <div className="mb-3">
                                        <input className="form-control" type="file" id="" accept="image/*" required />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="" className="form-label">
                                        Kontak <span className="text-muted">(Optional)</span>
                                    </label>
                                    <input type="text" className="form-control" id="" required />
                                    <div className="invalid-feedback">Security code required</div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            {/* Button */}
                            <div className="d-flex gap-2">
                                <button className="col-8 btn btn-primary btn-lg w-50" type="submit">
                                    Kirim Laporan
                                </button>
                                <button
                                    className="col-4 btn btn-outline-dark btn-lg w-50"
                                    type="button"
                                    onClick={() => navigate("/riwayat-user")}>
                                    Lihat Riwayat Laporan
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
            <Footer />
        </>

    );
}
