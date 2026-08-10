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
            $table->string('merek');
            $table->enum('kategori', ['matic', 'manual']);
            $table->bigInteger('harga');
            $table->year('tahun');
            $table->integer('kilometer');
            $table->enum('kondisi', ['bekas', 'baru']);
            $table->enum('status', ['terjual', 'tersedia'])->default('tersedia');
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