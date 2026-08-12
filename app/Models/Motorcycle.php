<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Motorcycle extends Model
{
    protected $fillable = [
        'nama',
        'brand_id',
        'kategori',
        'harga',
        'tahun',
        'kilometer',
        'status',
        'deskripsi',
        'foto',
    ];

    protected $casts = [
        'foto' => 'array',
        'harga' => 'integer',
        'kilometer' => 'integer',
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}