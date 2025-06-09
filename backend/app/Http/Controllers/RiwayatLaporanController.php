<?php

namespace App\Http\Controllers;

use App\Models\RiwayatLaporan;
use Illuminate\Http\Request;

class RiwayatLaporanController extends Controller
{
    // Ambil semua data riwayat laporan
    public function index()
    {
        $riwayat = RiwayatLaporan::with(['user', 'laporan', 'surat'])
            ->orderBy('tanggal', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $riwayat
        ]);
    }

    // Ambil detail riwayat laporan
    public function show($id)
    {
        $riwayat = RiwayatLaporan::with(['user', 'laporan', 'surat'])->find($id);

        if (!$riwayat) {
            return response()->json([
                'success' => false,
                'message' => 'Riwayat laporan tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $riwayat
        ]);
    }

    // Buat riwayat laporan baru
    public function store(Request $request)
    {
        $request->validate([
            'jenis_surat' => 'required|in:laporan,surat',
            'tanggal' => 'required|date',
            'judul_lapor' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'status' => 'required|in:perlu ditinjau,dalam proses,selesai,ditolak',
            'komentar' => 'nullable|string',
            'gambar' => 'nullable|string',
            'users_user_id' => 'required|exists:users,id',
            'laporan_laporan_id' => 'nullable|exists:laporans,laporan_id',
            'surat_surat_id' => 'nullable|exists:surats,surat_id'
        ]);

        $riwayat = RiwayatLaporan::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Riwayat laporan berhasil dibuat',
            'data' => $riwayat
        ], 201);
    }

    // Update riwayat laporan
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'sometimes|in:perlu ditinjau,dalam proses,selesai,ditolak',
            'komentar' => 'sometimes|nullable|string'
        ]);

        $riwayat = RiwayatLaporan::find($id);

        if (!$riwayat) {
            return response()->json([
                'success' => false,
                'message' => 'Riwayat laporan tidak ditemukan'
            ], 404);
        }

        $riwayat->update($request->only(['status', 'komentar']));

        return response()->json([
            'success' => true,
            'message' => 'Riwayat laporan berhasil diperbarui',
            'data' => $riwayat
        ]);
    }

    // Update status riwayat laporan
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:perlu ditinjau,dalam proses,selesai,ditolak',
            'komentar' => 'nullable|string'
        ]);

        $riwayat = RiwayatLaporan::find($id);

        if (!$riwayat) {
            return response()->json([
                'success' => false,
                'message' => 'Riwayat laporan tidak ditemukan'
            ], 404);
        }

        $riwayat->update([
            'status' => $request->status,
            'komentar' => $request->komentar
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Status riwayat laporan berhasil diperbarui',
            'data' => $riwayat
        ]);
    }

    // Hapus riwayat laporan
    public function destroy($id)
    {
        $riwayat = RiwayatLaporan::find($id);

        if (!$riwayat) {
            return response()->json([
                'success' => false,
                'message' => 'Riwayat laporan tidak ditemukan'
            ], 404);
        }

        $riwayat->delete();

        return response()->json([
            'success' => true,
            'message' => 'Riwayat laporan berhasil dihapus'
        ]);
    }
}
