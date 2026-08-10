<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Motorcycle extends Model
{
    protected $fillable = [
        'nama',
        'merek',
        'kategori',
        'harga',
        'tahun',
        'kilometer',
        'kondisi',
        'status',
        'deskripsi',
        'foto',
    ];

    protected $casts = [
        'foto' => 'array',
        'harga' => 'integer',
        'kilometer' => 'integer',
    ];
}
