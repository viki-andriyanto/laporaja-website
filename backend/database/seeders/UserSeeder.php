<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nik' => '1234567890123456',
            'nama_lengkap' => 'Admin',
            'no_telepon' => '081234567890',
            'password' => Hash::make('password')
        ]);
    }
}
