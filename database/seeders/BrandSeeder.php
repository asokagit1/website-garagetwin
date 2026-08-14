<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            'Honda',
            'Yamaha',
            'Suzuki',
            'Kawasaki',
            'Vespa',
            'Piaggio',
            'TVS',
            'Royal Enfield',
            'Benelli',
            'KTM',
            'BMW Motorrad',
            'Ducati',
            'Triumph',
            'Harley-Davidson',
            'Aprilia',
        ];

        foreach ($brands as $brand) {
            Brand::create([
                'nama' => $brand,
            ]);
        }
    }
}