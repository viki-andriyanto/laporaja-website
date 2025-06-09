// // src/_services/pengajuan.js
// import { getAllLaporan } from "./laporan";
// import { getAllSurat } from "./surat";

// /**
//  * Mengembalikan array gabungan antara laporan dan surat
//  * Format tiap objek:
//  * {
//  *   id,
//  *   tanggal,
//  *   jenis,    // "laporan" atau "surat"
//  *   judul,
//  *   status,   // hanya untuk laporan
//  *   // optional untuk surat:
//  *   keperluan_surat,
//  *   jenis_surat
//  * }
//  */
// export const getAllPengajuan = async () => {
//   try {
//     // 1) Ambil data laporan
//     const laporanData = await getAllLaporan();
//     // Transformasi menjadi format umum
//     const laporanMapped = laporanData.map((lap) => ({
//       id: lap.laporan_id,
//       tanggal: lap.tanggal_kejadian,
//       jenis: "laporan",
//       judul: lap.isi,
//       status: lap.status,
//       // Kosongkan field surat
//       keperluan_surat: null,
//       jenis_surat: null,
//     }));

//     // 2) Ambil data surat
//     const suratData = await getAllSurat();
//     const suratMapped = suratData.map((sur) => ({
//       id: sur.surat_id,
//       tanggal: sur.created_at,
//       jenis: "surat",
//       judul: sur.judul_surat,
//       status: null,
//       keperluan_surat: sur.keperluan_surat,
//       jenis_surat: sur.jenis_surat,
//     }));

//     // 3) Gabungkan dan urutkan berdasarkan tanggal descending
//     const gabungan = [...laporanMapped, ...suratMapped].sort((a, b) =>
//       new Date(b.tanggal) - new Date(a.tanggal)
//     );

//     return gabungan;
//   } catch (error) {
//     console.error("Gagal mengambil semua pengajuan:", error);
//     throw error;
//   }
// };
