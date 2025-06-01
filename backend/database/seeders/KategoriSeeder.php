<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Kategori;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategoris = [
            [
                'nama_kategori' => 'Infrastruktur',
                'users_user_id' => 1
            ],
            [
                'nama_kategori' => 'Keamanan',
                'users_user_id' => 1
            ],
            [
                'nama_kategori' => 'Lingkungan',
                'users_user_id' => 1
            ],
            [
                'nama_kategori' => 'Kesehatan',
                'users_user_id' => 1
            ],
            [
                'nama_kategori' => 'Pendidikan',
                'users_user_id' => 1
            ],
            [
                'nama_kategori' => 'Sosial',
                'users_user_id' => 1
            ],
            [
                'nama_kategori' => 'Ekonomi',
                'users_user_id' => 1
            ],
            [
                'nama_kategori' => 'Lainnya',
                'users_user_id' => 1
            ],
        ];
        foreach ($kategoris as $kategori) {
            Kategori::create($kategori);
        }
    }
}
