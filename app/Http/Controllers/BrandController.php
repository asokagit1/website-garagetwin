<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::latest()->get();
        
        return Inertia::render('Admin/Brand/Index', [
            'brands' => $brands
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Brand/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:brands,nama'
        ]);

        Brand::create($validated);

        return redirect('/admin/brand')->with('success', 'Data merek berhasil ditambahkan.');
    }

    public function edit(Brand $brand)
    {
        return Inertia::render('Admin/Brand/Edit', [
            'brand' => $brand
        ]);
    }

    public function update(Request $request, Brand $brand)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:brands,nama,' . $brand->id
        ]);

        $brand->update($validated);

        return redirect('/admin/brand')->with('success', 'Data merek berhasil diperbarui.');
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();

        return redirect('/admin/brand')->with('success', 'Data merek berhasil dihapus.');
    }
}