import { useState } from "react";
import Footer from "../../../shared/footer";
import Header from "../../../shared/header";
import { useNavigate } from "react-router-dom";
import { createRiwayat } from "../../../_services/riwayat-laporan";
// import { useDecodeToken } from "../../../_services/auth";
// import { useEffect, useState } from "react";

export default function FormLapor() {
    const navigate = useNavigate();
    const [formType, setFormType] = useState("laporan");
    // const token = localStorage.getItem("accessToken");
    // const decodeData = useDecodeToken(token);

    // useEffect(() => {

    //     if (!token || !decodeData || !decodeData.success) {
    //         alert("Silakan login terlebih dahulu untuk mengakses halaman ini.");
    //         navigate("/");
    //         return; 
    //     }   
    // },[ token, decodeData, navigate ]);

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
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jenis = "laporan"; 
        const judul = e.target.judul.value.trim();
        const kategori = e.target.kategori.value.trim();
        const lokasi = e.target.lokasi.value.trim();
        const deskripsi = e.target.deskripsi.value.trim();
        const file = e.target.file.files[0];
        const kontak = e.target.kontak.value.trim();

        if (!judul || !kategori || !lokasi || !deskripsi || !file) {
            alert("Semua field harus diisi!");
            return;
        }

        const formData = new FormData();
        formData.append("jenis", jenis);
        formData.append("judul", judul);
        formData.append("kategori", kategori);
        formData.append("lokasi_kejadian", lokasi);
        formData.append("deskripsi", deskripsi);
        formData.append("file", file);
        formData.append("kontak", kontak);

        try {
            const data = await createRiwayat(formData); 
            if (data.success) {
                setShowModal(true); 
                e.target.reset();
            } else {
                alert("Gagal mengirim laporan.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat mengirim laporan.");
        }

    };

    return (
        <>
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-12">
                        <label htmlFor="judul" className="form-label">Judul Laporan*</label>
                        <input type="text" className="form-control" id="judul" name="judul" required />
                    </div>

                    <div className="col-12">
                        <label htmlFor="kategori" className="form-label">Kategori*</label>
                        <select className="form-select" id="kategori" name="kategori" required>
                            <option value="">Pilih Kategori Laporan</option>
                            <option value="infrastruktur">Infrastruktur</option>
                            <option value="kebersihan">Kebersihan</option>
                            <option value="keamanan">Keamanan</option>
                            <option value="administrasi">Administrasi</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label htmlFor="lokasi" className="form-label">Lokasi Kejadian*</label>
                        <input type="text" className="form-control" id="lokasi" name="lokasi_kejadian" placeholder="Masukkan alamat atau koordinat" required />
                    </div>

                    <div className="col-12">
                        <label htmlFor="deskripsi" className="form-label">Deskripsi Permasalahan</label>
                        <textarea className="form-control" id="deskripsi" name="deskripsi" rows="5" placeholder="Jelaskan permasalahan secara rinci..." />
                    </div>

                    <div className="col-12">
                        <label className="form-label">file/Video Pendukung <span className="text-muted">(Optional)</span></label>
                        <input className="form-control" type="file" name="file" accept="image/*" />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Kontak <span className="text-muted">(Optional)</span></label>
                        <input type="text" className="form-control" name="kontak" />
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

            <ModalSukses
                show={showModal}
                onClose={() => setShowModal(false)}
                message="Laporan Anda berhasil dikirim!"
                onNavigate={() => navigate("/riwayat-user")}
            />
        </>
    );
}

// Form Surat
function FormSurat({ navigate }) {
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jenis = "surat";
        const judul = e.target.judul.value.trim();
        const jenisSurat = e.target.jenisSurat.value.trim();
        const keperluan = e.target.deskripsi.value.trim();
        const lampiran = e.target.lampiran.files[0];
        const kontak = e.target.kontak.value.trim();

        if (!judul || !jenisSurat || !keperluan) {
            alert("Semua field wajib diisi!");
            return;
        }

        const formData = new FormData();
        formData.append("jenis", jenis);
        formData.append("judul", judul);
        formData.append("jenis_surat", jenisSurat);
        formData.append("tujuan", keperluan); 
        formData.append("deskripsi", keperluan);  

        if (lampiran) {
            formData.append("file", lampiran); 
        }
        formData.append("kontak", kontak);

        try {
            const data = await createRiwayat(formData);
            if (data.success) {
                setShowModal(true);
            } else {
                alert("Gagal mengirim surat.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat mengirim surat.");
        }
    };

    return (
        <>
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-12">
                        <label htmlFor="judul" className="form-label">Judul Surat*</label>
                        <input type="text" className="form-control" id="judul" name="judul" required />
                    </div>
                    <div className="col-12">
                        <label htmlFor="jenisSurat" className="form-label">Jenis Surat*</label>
                        <select className="form-select" id="jenisSurat" name="jenisSurat" required>
                            <option value="">Pilih Jenis Surat</option>
                            <option value="keterangan">Surat Keterangan</option>
                            <option value="pengantar">Surat Pengantar</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label htmlFor="keperluan" className="form-label">Keperluan*</label>
                        <textarea className="form-control" id="keperluan" name="deskripsi" rows="4" placeholder="Tuliskan keperluan Anda" required />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Lampiran <span className="text-muted">(Opsional)</span></label>
                        <input className="form-control" type="file" accept="image/*,.pdf" name="lampiran" />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Kontak <span className="text-muted">(Optional)</span></label>
                        <input type="text" className="form-control" name="kontak" />
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

            <ModalSukses
                show={showModal}
                onClose={() => setShowModal(false)}
                message="Surat Anda berhasil dikirim!"
                onNavigate={() => navigate("/riwayat-user")}
            />
        </>
    );
}

// Komponen ModalSukses
function ModalSukses({ show, onClose, message, onNavigate }) {
    if (!show) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "transparent" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Sukses</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-dark" onClick={onClose}>
                            Tutup
                        </button>
                        <button type="button" className="btn btn-primary" onClick={onNavigate}>
                            Lihat Riwayat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
