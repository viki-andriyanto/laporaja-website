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
        $riwayat = RiwayatLaporan::with(['user', 'laporan', 'surat', 'laporan.kategori'])->find($id);

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
            'jenis' => 'required|in:laporan,surat',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf,doc,docx,xls,xlsx,ppt,pptx,mp4,mp3,csv|max:20480',
            'kontak' => 'nullable|string',
            'laporan_laporan_id' => 'nullable|exists:laporan,laporan_id',
            'surat_surat_id' => 'nullable|exists:surat,surat_id'
        ]);

        // Ambil data dari request kecuali file dan users_user_id
        $data = $request->except(['file', 'users_user_id']);

        // Set users_user_id otomatis dari user yang sedang login
        $data['users_user_id'] = auth('api')->id();

        // Jika ada file yang diupload
        if ($request->hasFile('file')) {
            $uploadedFile = $request->file('file');
            $filename = time() . '_' . $uploadedFile->getClientOriginalName();
            $path = $uploadedFile->storeAs('uploads/riwayat', $filename, 'public');

            // Simpan path relatif ke database
            $data['file'] = $path;
        }

        $riwayat = RiwayatLaporan::create($data);

        // Load relasi yang diperlukan
        $riwayat->load(['laporan.kategori', 'surat', 'users', 'laporan']);

        // Transform data untuk response - tambahkan URL lengkap untuk file
        $responseData = $riwayat->toArray();
        if ($riwayat->file) {
            $responseData['file_url'] = asset('storage/' . $riwayat->file);
            // Untuk compatibility dengan frontend, buat array media
            $responseData['media'] = [asset('storage/' . $riwayat->file)];
        }

        return response()->json([
            'success' => true,
            'message' => 'Riwayat laporan berhasil dibuat',
            'data' => $responseData
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
