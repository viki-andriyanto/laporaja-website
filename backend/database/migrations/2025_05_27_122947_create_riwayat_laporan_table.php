<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('riwayat_laporan', function (Blueprint $table) {
            $table->id('riwayat_id');
            $table->dateTime('tanggal');
            $table->string('judul_lapor', 200);
            $table->enum('status', ['dalam proses', 'perlu ditinjau', 'selesai', 'ditolak']);
            $table->text('komentar')->nullable();
            $table->string('kategori', 200);
            $table->string('gambar', 100)->nullable();
            
            // Foreign keys
            $table->foreignId('users_user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('kategori_kategori_id')->constrained('kategori', 'kategori_id')->onDelete('cascade');
            $table->foreignId('laporan_laporan_id')->constrained('laporan', 'laporan_id')->onDelete('cascade');
            $table->foreignId('surat_surat_id')->constrained('surat', 'surat_id')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_laporan');
    }
};
