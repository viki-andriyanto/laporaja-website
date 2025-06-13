import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormSubmission } from './hooks/useFormSubmission';
import Footer from "../../../shared/footer";
import Header from "../../../shared/header";
import ModalSukses from '../../../components/modalsukses';

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


// Form Laporan dengan implementasi yang benar
function FormLaporan({ navigate }) {
    const [showModal, setShowModal] = useState(false);
    const { submitLaporan, isLoading } = useFormSubmission();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            judul: e.target.judul.value.trim(),
            kategori: e.target.kategori.value.trim(),
            lokasi_kejadian: e.target.lokasi.value.trim(),
            deskripsi: e.target.deskripsi.value.trim(),
            file: e.target.file.files[0],
            kontak: e.target.kontak.value.trim()
        };

        if (!formData.judul || !formData.kategori || !formData.lokasi_kejadian || !formData.deskripsi) {
            alert("Semua field wajib harus diisi!");
            return;
        }

        const result = await submitLaporan(formData);

        if (result.success) {
            setShowModal(true);
            e.target.reset();
        } else {
            alert("Terjadi kesalahan saat mengirim laporan: " + result.error);
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
                            <option value="1">Infrastruktur</option>
                            <option value="2">Kebersihan</option>
                            <option value="3">Keamanan</option>
                            <option value="4">Administrasi</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label htmlFor="lokasi" className="form-label">Lokasi Kejadian*</label>
                        <input type="text" className="form-control" id="lokasi" name="lokasi" placeholder="Masukkan alamat atau koordinat" required />
                    </div>

                    <div className="col-12">
                        <label htmlFor="deskripsi" className="form-label">Deskripsi Permasalahan*</label>
                        <textarea className="form-control" id="deskripsi" name="deskripsi" rows="5" placeholder="Jelaskan permasalahan secara rinci..." required />
                    </div>

                    <div className="col-12">
                        <label className="form-label">File/Video Pendukung <span className="text-muted">(Optional)</span></label>
                        <input className="form-control" type="file" name="file" accept="image/*,video/*" />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Kontak <span className="text-muted">(Optional)</span></label>
                        <input type="text" className="form-control" name="kontak" placeholder="No. HP atau Email" />
                    </div>
                </div>

                <hr className="my-4" />

                <div className="d-flex gap-2">
                    <button
                        className="col-8 btn btn-primary btn-lg w-50"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Mengirim..." : "Kirim Laporan"}
                    </button>
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

// Form Surat dengan implementasi yang benar
function FormSurat({ navigate }) {
    const [showModal, setShowModal] = useState(false);
    const { submitSurat, isLoading } = useFormSubmission();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            judul: e.target.judul.value.trim(),
            jenisSurat: e.target.jenisSurat.value.trim(),
            deskripsi: e.target.deskripsi.value.trim(),
            file: e.target.lampiran.files[0],
            kontak: e.target.kontak.value.trim()
        };

        if (!formData.judul || !formData.jenisSurat || !formData.deskripsi) {
            alert("Semua field wajib diisi!");
            return;
        }

        const result = await submitSurat(formData);

        if (result.success) {
            setShowModal(true);
            e.target.reset();
        } else {
            alert("Terjadi kesalahan saat mengirim surat: " + result.error);
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
                        <input type="text" className="form-control" name="kontak" placeholder="No. HP atau Email" />
                    </div>
                </div>

                <hr className="my-4" />

                <div className="d-flex gap-2">
                    <button
                        className="col-8 btn btn-primary btn-lg w-50"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Mengirim..." : "Kirim Surat"}
                    </button>
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

// Main component
