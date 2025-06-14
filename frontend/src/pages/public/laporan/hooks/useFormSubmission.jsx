import { useState } from "react";
import { createLaporan, deleteLaporan } from "../../../../_services/laporan";
import { createRiwayat } from "../../../../_services/riwayat-laporan";
import { createSurat, deleteSurat } from "../../../../_services/surat";

export const useFormSubmission = () => {
    const [isLoading, setIsLoading] = useState(false);

    const submitLaporan = async (formData) => {
        setIsLoading(true);
        let laporanId = null;

        try {
            // 1. Create laporan first
            const laporanData = {
                lokasi_kejadian: formData.lokasi_kejadian,
                tanggal_kejadian: new Date().toISOString(),
                kategori_kategori_id: parseInt(formData.kategori)
            };

            const laporanResponse = await createLaporan(laporanData);
            laporanId = laporanResponse.data?.laporan_id;

            if (!laporanId) {
                throw new Error("Gagal membuat laporan");
            }

            // 2. Create riwayat with reference to laporan
            const riwayatFormData = new FormData();
            riwayatFormData.append("jenis", "laporan");
            riwayatFormData.append("judul", formData.judul);
            riwayatFormData.append("deskripsi", formData.deskripsi);
            riwayatFormData.append("status", "perlu ditinjau");
            riwayatFormData.append("laporan_laporan_id", laporanId);

            if (formData.file) riwayatFormData.append("file", formData.file);
            if (formData.kontak) riwayatFormData.append("kontak", formData.kontak);
            

            const riwayatResponse = await createRiwayat(riwayatFormData);

            if (!riwayatResponse.success) {
                throw new Error("Gagal membuat riwayat");
            }

            return { success: true, data: { laporan: laporanResponse, riwayat: riwayatResponse } };

        } catch (error) {
            // Rollback laporan jika ada error
            if (laporanId) {
                try {
                    await deleteLaporan(laporanId);
                } catch (rollbackError) {
                    console.error("Gagal rollback:", rollbackError);
                }
            }
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const submitSurat = async (formData) => {
        setIsLoading(true);
        let suratId = null;

        try {
            // 1. Create surat first
            const suratData = {
                jenis_surat: formData.jenisSurat
            };

            const suratResponse = await createSurat(suratData);
            suratId = suratResponse.data?.surat_id;

            if (!suratId) {
                throw new Error("Gagal membuat surat");
            }

            // 2. Create riwayat with reference to surat
            const riwayatFormData = new FormData();
            riwayatFormData.append("jenis", "surat");
            riwayatFormData.append("judul", formData.judul);
            riwayatFormData.append("deskripsi", formData.deskripsi);
            riwayatFormData.append("status", "perlu ditinjau");
            riwayatFormData.append("surat_surat_id", suratId);

            if (formData.file) riwayatFormData.append("file", formData.file);
            if (formData.kontak) riwayatFormData.append("kontak", formData.kontak);
            

            const riwayatResponse = await createRiwayat(riwayatFormData);

            if (!riwayatResponse.success) {
                throw new Error("Gagal membuat riwayat");
            }

            return { success: true, data: { surat: suratResponse, riwayat: riwayatResponse } };

        } catch (error) {
            // Rollback surat jika ada error
            if (suratId) {
                try {
                    await deleteSurat(suratId);
                } catch (rollbackError) {
                    console.error("Gagal rollback:", rollbackError);
                }
            }
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        submitLaporan,
        submitSurat,
        isLoading
    };
};