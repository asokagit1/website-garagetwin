<?php

namespace App\Http\Controllers;

use App\Models\Motorcycle;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MotorcycleController extends Controller
{
    public function index()
    {
        $motorcycles = Motorcycle::with('brand')->latest()->get();
        
        return Inertia::render('Admin/Motor/Index', [
            'motorcycles' => $motorcycles
        ]);
    }

    public function create()
    {
        $brands = Brand::all();
        
        return Inertia::render('Admin/Motor/Create', [
            'brands' => $brands
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'brand_id' => 'required|exists:brands,id',
            'kategori' => 'required|in:matik,manual',
            'harga' => 'required|integer',
            'tahun' => 'required|digits:4|integer',
            'kilometer' => 'required|integer',
            'status' => 'required|in:terjual,tersedia',
            'deskripsi' => 'required|string',
            'foto' => 'nullable|array',
            'foto.*' => 'image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($request->hasFile('foto')) {
            $imagePaths = [];
            foreach ($request->file('foto') as $image) {
                $path = $image->store('motorcycles', 'public');
                $imagePaths[] = $path;
            }
            $validated['foto'] = $imagePaths;
        }

        Motorcycle::create($validated);

        return redirect('/admin/motor')->with('success', 'Data motor berhasil ditambahkan.');
    }

    public function show(Motorcycle $motorcycle)
    {
        return Inertia::render('Admin/Motor/Show', [
            'motorcycle' => $motorcycle->load('brand')
        ]);
    }

    public function edit(Motorcycle $motorcycle)
    {
        $brands = Brand::all();
        
        return Inertia::render('Admin/Motor/Edit', [
            'motorcycle' => $motorcycle,
            'brands' => $brands
        ]);
    }

    public function update(Request $request, Motorcycle $motorcycle)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'brand_id' => 'required|exists:brands,id',
            'kategori' => 'required|in:matik,manual',
            'harga' => 'required|integer',
            'tahun' => 'required|digits:4|integer',
            'kilometer' => 'required|integer',
            'status' => 'required|in:terjual,tersedia',
            'deskripsi' => 'required|string',
            'foto' => 'nullable|array',
            'foto.*' => 'image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($request->hasFile('foto')) {
            if ($motorcycle->foto) {
                foreach ($motorcycle->foto as $oldImage) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
            
            $imagePaths = [];
            foreach ($request->file('foto') as $image) {
                $path = $image->store('motorcycles', 'public');
                $imagePaths[] = $path;
            }
            $validated['foto'] = $imagePaths;
        }

        $motorcycle->update($validated);

        return redirect('/admin/motor')->with('success', 'Data motor berhasil diperbarui.');
    }

    public function destroy(Motorcycle $motorcycle)
    {
        if ($motorcycle->foto) {
            foreach ($motorcycle->foto as $oldImage) {
                Storage::disk('public')->delete($oldImage);
            }
        }
        
        $motorcycle->delete();

        return redirect('/admin/motor')->with('success', 'Data motor berhasil dihapus.');
    }
}