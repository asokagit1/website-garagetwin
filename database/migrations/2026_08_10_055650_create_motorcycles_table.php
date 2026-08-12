<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('motorcycles', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->foreignId('brand_id')->constrained()->cascadeOnDelete();
            $table->enum('kategori', ['matik', 'manual']);
            $table->bigInteger('harga');
            $table->integer('tahun');
            $table->integer('kilometer');
            $table->enum('status', ['terjual', 'tersedia']);
            $table->text('deskripsi');
            $table->json('foto')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('motorcycles');
    }
};