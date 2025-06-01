<?php

namespace App\Http\Controllers;

use App\Models\RiwayatLaporan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RiwayatLaporanController extends Controller
{
    public function index()
    {
        try {
            $riwayatLaporan = RiwayatLaporan::with(['user', 'laporan', 'surat'])->get();
            return response()->json([
                'success' => true,
                'data' => $riwayatLaporan
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving riwayat laporan data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $riwayatLaporan = RiwayatLaporan::with(['user', 'laporan', 'surat'])->find($id);
            
            if (!$riwayatLaporan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Riwayat laporan not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $riwayatLaporan
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving riwayat laporan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'jenis_surat' => 'required|in:laporan,surat',
            'tanggal' => 'required|date',
            'judul_lapor' => 'required|string|max:200',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'users_user_id' => 'required|exists:users,id',
            'laporan_laporan_id' => 'nullable|exists:laporan,laporan_id',
            'surat_surat_id' => 'nullable|exists:surat,surat_id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Upload gambar jika ada
        if ($request->hasFile('gambar')) {
            $gambar = $request->file('gambar');
            $gambarPath = $gambar->store('riwayat_laporan', 'public');
            $data['gambar'] = $gambarPath;
        }

        try {
            // Ambil data dari request dan set status default
            $data = $request->all();
            $data['status'] = 'perlu ditinjau'; // Status otomatis untuk user baru
            
            $riwayatLaporan = RiwayatLaporan::create($data);
            
            return response()->json([
                'success' => true,
                'message' => 'Riwayat laporan created successfully',
                'data' => $riwayatLaporan
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating riwayat laporan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, RiwayatLaporan $riwayatLaporan)
    {
        $validator = Validator::make($request->all(), [
            'jenis_surat' => 'sometimes|required|in:laporan,surat',
            'tanggal' => 'sometimes|required|date',
            'judul_lapor' => 'sometimes|required|string|max:200',
            'deskripsi' => 'sometimes|required|string',
            'gambar' => 'nullable|string|max:100',
            'users_user_id' => 'sometimes|required|exists:users,id',
            'laporan_laporan_id' => 'nullable|exists:laporan,laporan_id',
            'surat_surat_id' => 'nullable|exists:surat,surat_id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Exclude status from regular update - hanya admin yang bisa update status
            $data = $request->except('status');
            $riwayatLaporan->update($data);
            
            return response()->json([
                'success' => true,
                'message' => 'Riwayat laporan updated successfully',
                'data' => $riwayatLaporan
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating riwayat laporan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Method khusus untuk admin update status
    public function updateStatus(Request $request, RiwayatLaporan $riwayatLaporan)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:dalam proses,perlu ditinjau,selesai,ditolak',
            'komentar' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $riwayatLaporan->update([
                'status' => $request->status,
                'komentar' => $request->komentar ?? $riwayatLaporan->komentar
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Status updated successfully',
                'data' => $riwayatLaporan
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(RiwayatLaporan $riwayatLaporan)
    {
        try {
            $riwayatLaporan->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Riwayat laporan deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting riwayat laporan',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}