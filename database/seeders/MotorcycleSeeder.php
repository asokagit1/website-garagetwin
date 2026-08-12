<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Motorcycle;
use Illuminate\Database\Seeder;

class MotorcycleSeeder extends Seeder
{
    public function run(): void
    {
        // Seed Brands
        $kawasaki = Brand::firstOrCreate(['nama' => 'Kawasaki']);
        $honda = Brand::firstOrCreate(['nama' => 'Honda']);
        $yamaha = Brand::firstOrCreate(['nama' => 'Yamaha']);
        $vespa = Brand::firstOrCreate(['nama' => 'Vespa']);

        // Clear existing motorcycles to avoid duplicate seeding issues
        Motorcycle::truncate();

        // 1. Kawasaki KLX 150 BF (featured wide card in catalog)
        Motorcycle::create([
            'nama' => 'Kawasaki KLX 150 BF',
            'brand_id' => $kawasaki->id,
            'kategori' => 'manual',
            'harga' => 32500000,
            'tahun' => 2022,
            'kilometer' => 8500,
            'status' => 'tersedia',
            'deskripsi' => 'Kawasaki KLX 150 BF dengan performa trail tangguh dan siap dikendarai di berbagai medan jalan.',
            'foto' => [
                'motorcycles/klx.png',
                'motorcycles/klx_wheel.png',
                'motorcycles/klx_engine.png',
                'motorcycles/klx_rear.png',
                'motorcycles/klx_handlebar.png'
            ]
        ]);

        // 2. Honda Vario 160 ABS (top right card)
        Motorcycle::create([
            'nama' => 'Honda Vario 160 ABS',
            'brand_id' => $honda->id,
            'kategori' => 'matik',
            'harga' => 28000000,
            'tahun' => 2023,
            'kilometer' => 3200,
            'status' => 'tersedia',
            'deskripsi' => 'Honda Vario 160 ABS dengan mesin bertenaga eSP+ dan fitur pengereman handal untuk mobilitas harian.',
            'foto' => ['motorcycles/vario.png']
        ]);

        // 3. Yamaha R15M Connected (bottom left card)
        Motorcycle::create([
            'nama' => 'Yamaha R15M Connected',
            'brand_id' => $yamaha->id,
            'kategori' => 'manual',
            'harga' => 42500000,
            'tahun' => 2022,
            'kilometer' => 12000,
            'status' => 'tersedia',
            'deskripsi' => 'Yamaha R15M Connected motor sport full fairing dengan teknologi canggih Y-Connect.',
            'foto' => ['motorcycles/r15.png']
        ]);

        // 4. Vespa Sprint 150 i-get (bottom middle card)
        Motorcycle::create([
            'nama' => 'Vespa Sprint 150 i-get',
            'brand_id' => $vespa->id,
            'kategori' => 'matik',
            'harga' => 48000000,
            'tahun' => 2021,
            'kilometer' => 15500,
            'status' => 'tersedia',
            'deskripsi' => 'Vespa Sprint 150 i-get skuter ikonik Italia bergaya sporty dengan akselerasi yang halus dan efisien.',
            'foto' => ['motorcycles/vespa.png']
        ]);

        // 5. Honda CB150X (bottom right card - marked "Baru Masuk" / new)
        Motorcycle::create([
            'nama' => 'Honda CB150X',
            'brand_id' => $honda->id,
            'kategori' => 'manual',
            'harga' => 31800000,
            'tahun' => 2023,
            'kilometer' => 1500,
            'status' => 'tersedia',
            'deskripsi' => 'Honda CB150X motor adventure sport tangguh yang memberikan kenyamanan berkendara jarak jauh.',
            'foto' => ['motorcycles/cb150x.png']
        ]);
    }
}
