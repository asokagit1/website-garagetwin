
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ motorcycles = [], brands = [] }) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 4;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [editingMotor, setEditingMotor] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [motorToDelete, setMotorToDelete] = useState(null);

    const handleLogout = () => {
    router.post('/logout');
    };
    

    const [formData, setFormData] = useState({
        nama: '',
        brand_id: '',
        kategori: '',
        harga: '',
        tahun: '',
        kilometer: '',
        status: 'tersedia',
        deskripsi: '',
        foto: [],
    });

            const handleAddClick = () => {
        setModalMode('create');
        setEditingMotor(null);

        setFormData({
            nama: '',
            brand_id: '',
            kategori: '',
            harga: '',
            tahun: '',
            kilometer: '',
            status: 'tersedia',
            deskripsi: '',
            foto: [],
        });

        setIsModalOpen(true);
    };

    const handleDeleteClick = (motor) => {
        setMotorToDelete(motor);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (!motorToDelete) return;

        router.delete(`/admin/motor/${motorToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setMotorToDelete(null);
            },
            onError: (errors) => {
                console.error('Gagal menghapus motor:', errors);
            },
        });
    };

    const handleEditClick = (motor) => {
        setModalMode('edit');
        setEditingMotor(motor);

        setFormData({
            nama: motor.nama || '',
            brand_id: motor.brand_id || '',
            kategori: motor.kategori || '',
            harga: motor.harga || '',
            tahun: motor.tahun || '',
            kilometer: motor.kilometer || '',
            status: motor.status || 'tersedia',
            deskripsi: motor.deskripsi || '',
            foto: [],
        });

        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (formData.foto.length + files.length > 5) {
            alert('Maksimal foto yang dapat diunggah adalah 5.');
            return;
        }

        const validFiles = files.filter((file) => {
            if (file.size > 2048 * 1024) {
                alert(`Ukuran file ${file.name} melebihi 2MB.`);
                return false;
            }

            return true;
        });

        setFormData((prev) => ({
            ...prev,
            foto: [...prev.foto, ...validFiles],
        }));
    };

    const removePhoto = (index) => {
        setFormData((prev) => ({
            ...prev,
            foto: prev.foto.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('nama', formData.nama);
        data.append('brand_id', formData.brand_id);
        data.append('kategori', formData.kategori);
        data.append('harga', formData.harga);
        data.append('tahun', formData.tahun);
        data.append('kilometer', formData.kilometer);
        data.append('status', formData.status);
        data.append('deskripsi', formData.deskripsi);

        formData.foto.forEach((file) => {
            data.append('foto[]', file);
        });

        if (modalMode === 'edit') {
            data.append('_method', 'PUT');

            router.post(
                `/admin/motor/${editingMotor.id}`,
                data,
                {
                    forceFormData: true,
                    onSuccess: () => {
                        setIsModalOpen(false);
                        setEditingMotor(null);
                    },
                    onError: (errors) => {
                        console.error('Gagal memperbarui motor:', errors);
                    },
                }
            );
        } else {
            router.post('/admin/motor', data, {
                forceFormData: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                },
                onError: (errors) => {
                    console.error('Gagal menambahkan motor:', errors);
                },
            });
        }
    };
    // Filter berdasarkan nama motor atau brand
    const filteredMotorcycles = motorcycles.filter((motor) => {
        const keyword = search.toLowerCase();

        return (
            motor.nama?.toLowerCase().includes(keyword) ||
            motor.brand?.nama?.toLowerCase().includes(keyword)
        );
    });

    // Pagination
    const totalPages = Math.ceil(
        filteredMotorcycles.length / itemsPerPage
    );

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentMotorcycles = filteredMotorcycles.slice(
        startIndex,
        startIndex + itemsPerPage
    );
    

    // Format harga
    const formatRupiah = (harga) => {
        return `Rp ${Number(harga).toLocaleString('id-ID')}`;
    };

    // Status badge
    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'tersedia':
                return 'bg-[#e62e45] text-white';

            case 'terjual':
                return 'bg-[#2d323c] text-[#8c93a0]';

            case 'dipesan':
                return 'bg-[#d1d5db] text-[#1a1d24]';

            default:
                return 'bg-[#2d323c] text-[#8c93a0]';
        }
    };

    // Reset halaman ketika melakukan pencarian
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <Head title="Manajemen Motor" />

            <div className="min-h-screen bg-[#121418] text-[#e1e1e1] p-5 md:p-8">

                <div className="max-w-7xl mx-auto bg-[#181b20] border border-dashed border-[#2a2e37] rounded-lg p-5 md:p-6">

                    {/* Breadcrumb */}
                    <div className="text-[11px] tracking-[1px] text-[#717786] font-semibold mb-2">
                        INVENTORY / MOTORCYCLES
                    </div>

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

                        <h1 className="text-2xl md:text-[28px] font-extrabold text-white">
                            Katalog Motor
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-3">


                        {/* Logout */}
                         <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-md border border-[#2a2e37] px-4 py-2.5 text-sm font-semibold text-[#8c93a0] transition hover:border-[#e62e45] hover:text-[#e62e45]"
                            >
                            Logout
                            </button>

                            {/* Search */}
                            <div className="relative flex items-center">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="absolute left-3 h-4 w-4 text-[#717786]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>

                                <input
                                    type="text"
                                    value={search}
                                    onChange={handleSearch}
                                    placeholder="Cari brand..."
                                    className="w-full sm:w-[220px] bg-[#0e1013] border border-[#2a2e37] text-white py-2.5 pl-9 pr-3 rounded-md text-sm outline-none focus:border-[#e62e45] transition"
                                />

                            </div>

                            {/* Tambah Motor */}
                            <button
                                type="button"
                                onClick={handleAddClick}
                                className="bg-[#e62e45] hover:bg-[#c82338] text-white px-5 py-2.5 rounded-md font-semibold text-sm transition"
                            >
                                + Tambah Motor
                            </button>

                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">

                        <table className="w-full border-collapse text-left min-w-[900px]">

                            <thead>
                                <tr>
                                    <th className="text-[#717786] text-xs font-semibold py-3.5 px-3 border-b border-[#232730]">
                                        Foto
                                    </th>

                                    <th className="text-[#717786] text-xs font-semibold py-3.5 px-3 border-b border-[#232730]">
                                        Motor
                                    </th>

                                    <th className="text-[#717786] text-xs font-semibold py-3.5 px-3 border-b border-[#232730]">
                                        Brand
                                    </th>

                                    <th className="text-[#717786] text-xs font-semibold py-3.5 px-3 border-b border-[#232730]">
                                        Kategori
                                    </th>

                                    <th className="text-[#717786] text-xs font-semibold py-3.5 px-3 border-b border-[#232730]">
                                        Harga
                                    </th>

                                    <th className="text-[#717786] text-xs font-semibold py-3.5 px-3 border-b border-[#232730]">
                                        Status
                                    </th>

                                    <th className="text-[#717786] text-xs font-semibold py-3.5 px-3 border-b border-[#232730]">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {currentMotorcycles.length > 0 ? (
                                    currentMotorcycles.map((motor) => {

                                        const imageSrc =
                                            motor.foto &&
                                            motor.foto.length > 0
                                                ? `/storage/${motor.foto[0]}`
                                                : '/images/placeholder-motor.jpg';

                                        return (
                                            <tr
                                                key={motor.id}
                                                className="hover:bg-[#1d2026] transition"
                                            >

                                                {/* Foto */}
                                                <td className="py-4 px-3 border-b border-[#232730]">

                                                    <img
                                                        src={imageSrc}
                                                        alt={motor.nama}
                                                        className="w-[70px] h-[45px] object-cover rounded bg-[#0e1013]"
                                                    />

                                                </td>

                                                {/* Motor */}
                                                <td className="py-4 px-3 border-b border-[#232730] align-middle">

                                                    <span className="block font-bold text-white">
                                                        {motor.nama}
                                                    </span>

                                                    <span className="block text-xs text-[#717786] mt-0.5">
                                                        {motor.tahun}
                                                        {' • '}
                                                        {Number(motor.kilometer || 0).toLocaleString('id-ID')}
                                                        {' KM'}
                                                    </span>

                                                </td>

                                                {/* Brand */}
                                                <td className="py-4 px-3 border-b border-[#232730]">
                                                    {motor.brand?.nama || '-'}
                                                </td>

                                                {/* Kategori */}
                                                <td className="py-4 px-3 border-b border-[#232730]">

                                                    <span className="bg-[#232730] text-[#9aa0a6] px-2.5 py-1 rounded text-xs">
                                                        {motor.kategori}
                                                    </span>

                                                </td>

                                                {/* Harga */}
                                                <td className="py-4 px-3 border-b border-[#232730] whitespace-nowrap">
                                                    {formatRupiah(motor.harga)}
                                                </td>

                                                {/* Status */}
                                                <td className="py-4 px-3 border-b border-[#232730]">

                                                    <span
                                                        className={`inline-block px-3 py-1.5 rounded text-[11px] font-extrabold tracking-[0.5px] ${getStatusClass(
                                                            motor.status
                                                        )}`}
                                                    >
                                                        {motor.status?.toUpperCase()}
                                                    </span>

                                                </td>

                                                {/* Aksi */}
                                                <td className="py-4 px-3 border-b border-[#232730] whitespace-nowrap">

                                                    <button
                                                        type="button"
                                                        onClick={() => handleEditClick(motor)}
                                                        className="bg-transparent border-none cursor-pointer text-sm mr-2 text-[#717786] hover:text-white transition"
                                                        title="Edit"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteClick(motor)}
                                                        className="bg-transparent border-none cursor-pointer text-sm text-[#717786] hover:text-[#e62e45] transition"
                                                        title="Delete"
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>
                                        );
                                    })
                                ) : (

                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="py-12 text-center text-[#717786]"
                                        >
                                            {search
                                                ? 'Motor tidak ditemukan.'
                                                : 'Belum ada data motor.'}
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-5 pt-3">

                        <div className="text-[13px] text-[#717786]">

                            {filteredMotorcycles.length > 0 ? (
                                <>
                                    Menampilkan{' '}
                                    {startIndex + 1}{' '}
                                    hingga{' '}
                                    {Math.min(
                                        startIndex + itemsPerPage,
                                        filteredMotorcycles.length
                                    )}{' '}
                                    dari{' '}
                                    {filteredMotorcycles.length}{' '}
                                    motor
                                </>
                            ) : (
                                'Menampilkan 0 motor'
                            )}

                        </div>

                        <div className="flex gap-1.5">

                            {/* Previous */}
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.max(page - 1, 1)
                                    )
                                }
                                className={`w-8 h-8 rounded border border-[#2a2e37] flex items-center justify-center text-sm transition ${
                                    currentPage === 1
                                        ? 'text-[#3f434d] cursor-not-allowed'
                                        : 'bg-[#121418] text-[#8c93a0] hover:bg-[#232730]'
                                }`}
                            >
                                &lt;
                            </button>

                            {/* Page Numbers */}
                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (

                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 rounded border text-[13px] flex items-center justify-center transition ${
                                        currentPage === page
                                            ? 'bg-[#e62e45] text-white border-[#e62e45]'
                                            : 'bg-[#121418] text-[#8c93a0] border-[#2a2e37] hover:bg-[#232730]'
                                    }`}
                                >
                                    {page}
                                </button>

                            ))}

                            {/* Next */}
                            <button
                                type="button"
                                disabled={
                                    currentPage === totalPages ||
                                    totalPages === 0
                                }
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.min(
                                            page + 1,
                                            totalPages
                                        )
                                    )
                                }
                                className={`w-8 h-8 rounded border border-[#2a2e37] flex items-center justify-center text-sm transition ${
                                    currentPage === totalPages ||
                                    totalPages === 0
                                        ? 'text-[#3f434d] cursor-not-allowed'
                                        : 'bg-[#121418] text-[#8c93a0] hover:bg-[#232730]'
                                }`}
                            >
                                &gt;
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* Modal Create / Edit Motor */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsModalOpen(false);
                        }
                    }}
                >
                    <div className="w-full max-w-[920px] max-h-[90vh] overflow-y-auto rounded-lg border border-[#282c35] bg-[#16181d] text-[#e1e1e1] shadow-2xl">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-[#232730] px-6 py-5">
                            <h3 className="text-xl font-bold text-white">
                                {modalMode === 'create'
                                    ? 'Tambah Motor Baru'
                                    : 'Edit Data Motor'}
                            </h3>

                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-2xl text-[#717786] transition hover:text-white"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>

                            <div className="flex flex-col gap-6 p-6 lg:flex-row">

                                {/* LEFT */}
                                <div className="flex flex-1 flex-col gap-4">

                                    {/* Nama */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#8c93a0]">
                                            Nama Motor
                                        </label>

                                        <input
                                            type="text"
                                            name="nama"
                                            value={formData.nama}
                                            onChange={handleInputChange}
                                            placeholder="Masukkan nama motor..."
                                            required
                                            className="w-full rounded border border-[#232730] bg-[#0b0c0e] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#e62e45]"
                                        />
                                    </div>

                                    {/* Brand + Kategori */}
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#8c93a0]">
                                                Brand
                                            </label>

                                            <select
                                                name="brand_id"
                                                value={formData.brand_id}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full rounded border border-[#232730] bg-[#0b0c0e] px-3 py-2.5 text-sm text-white outline-none focus:border-[#e62e45]"
                                            >
                                                <option value="">
                                                    Pilih brand...
                                                </option>

                                                {brands.map((brand) => (
                                                    <option
                                                        key={brand.id}
                                                        value={brand.id}
                                                    >
                                                        {brand.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#8c93a0]">
                                                Kategori
                                            </label>

                                            <select
                                                name="kategori"
                                                value={formData.kategori}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full rounded border border-[#232730] bg-[#0b0c0e] px-3 py-2.5 text-sm text-white outline-none focus:border-[#e62e45]"
                                            >
                                                <option value="">
                                                    Pilih kategori...
                                                </option>

                                                <option value="manual">
                                                    Manual
                                                </option>

                                                <option value="matik">
                                                    Matik
                                                </option>
                                            </select>
                                        </div>

                                    </div>

                                    {/* Tahun + Kilometer */}
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#8c93a0]">
                                                Tahun
                                            </label>

                                            <input
                                                type="number"
                                                name="tahun"
                                                value={formData.tahun}
                                                onChange={handleInputChange}
                                                placeholder="YYYY"
                                                min="1900"
                                                max="2099"
                                                required
                                                className="w-full rounded border border-[#232730] bg-[#0b0c0e] px-3 py-2.5 text-sm text-white outline-none focus:border-[#e62e45]"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#8c93a0]">
                                                Kilometer
                                            </label>

                                            <input
                                                type="number"
                                                name="kilometer"
                                                value={formData.kilometer}
                                                onChange={handleInputChange}
                                                placeholder="0"
                                                min="0"
                                                required
                                                className="w-full rounded border border-[#232730] bg-[#0b0c0e] px-3 py-2.5 text-sm text-white outline-none focus:border-[#e62e45]"
                                            />
                                        </div>

                                    </div>

                                    {/* Harga */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#8c93a0]">
                                            Harga (IDR)
                                        </label>

                                        <input
                                            type="number"
                                            name="harga"
                                            value={formData.harga}
                                            onChange={handleInputChange}
                                            placeholder="Masukkan harga..."
                                            min="0"
                                            required
                                            className="w-full rounded border border-[#232730] bg-[#0b0c0e] px-3 py-2.5 text-sm text-white outline-none focus:border-[#e62e45]"
                                        />
                                    </div>

                                    {/* Status */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#8c93a0]">
                                            Status
                                        </label>

                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded border border-[#232730] bg-[#0b0c0e] px-3 py-2.5 text-sm text-white outline-none focus:border-[#e62e45]"
                                        >
                                            <option value="tersedia">
                                                Tersedia
                                            </option>

                                            <option value="terjual">
                                                Terjual
                                            </option>
                                        </select>
                                    </div>

                                    {/* Deskripsi */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#8c93a0]">
                                            Deskripsi Motor
                                        </label>

                                        <textarea
                                            name="deskripsi"
                                            value={formData.deskripsi}
                                            onChange={handleInputChange}
                                            rows="4"
                                            placeholder="Masukkan deskripsi motor..."
                                            required
                                            className="w-full resize-y rounded border border-[#232730] bg-[#0b0c0e] px-3 py-2.5 text-sm text-white outline-none focus:border-[#e62e45]"
                                        />
                                    </div>

                                </div>

                                {/* RIGHT */}
                                <div className="flex flex-1 flex-col">

                                    <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#8c93a0]">
                                        Foto Motor
                                    </label>

                                    {/* Main Preview */}
                                    <div className="relative mb-3 h-[220px] overflow-hidden rounded-md bg-[#0b0c0e]">

                                        {formData.foto.length > 0 ? (
                                            <img
                                                src={URL.createObjectURL(formData.foto[0])}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : editingMotor?.foto?.length > 0 ? (
                                            <img
                                                src={`/storage/${editingMotor.foto[0]}`}
                                                alt={editingMotor.nama}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-[#555b68]">
                                                Preview Foto
                                            </div>
                                        )}

                                        {formData.foto.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removePhoto(0)}
                                                className="absolute right-2.5 top-2.5 rounded bg-black/60 px-2 py-1 text-white transition hover:bg-[#e62e45]"
                                            >
                                                🗑️
                                            </button>
                                        )}

                                        <span className="absolute bottom-2.5 left-2.5 rounded bg-black/60 px-2 py-1 text-[11px] text-[#d1d5db]">
                                            Foto Utama
                                        </span>

                                    </div>

                                    {/* Thumbnails */}
                                    {formData.foto.length > 0 && (
                                        <div className="mb-4 grid grid-cols-4 gap-2">

                                            {formData.foto.map((file, index) => (
                                                <div
                                                    key={`${file.name}-${index}`}
                                                    className="relative h-[70px] overflow-hidden rounded border border-[#232730]"
                                                >
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Foto ${index + 1}`}
                                                        className="h-full w-full object-cover"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => removePhoto(index)}
                                                        className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded bg-black/70 text-[10px] text-white"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}

                                        </div>
                                    )}

                                    {/* Upload */}
                                    <label className="cursor-pointer rounded border border-dashed border-[#343946] p-2.5 text-center text-xs text-[#8c93a0] transition hover:border-[#e62e45] hover:text-white">

                                        📷 Tambah Foto Lagi (Maks 5)

                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/jpg"
                                            multiple
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />

                                    </label>

                                    <p className="mt-2 text-center text-[10px] text-[#555b68]">
                                        Format: JPG, PNG. Maks 2MB per file.
                                    </p>

                                </div>

                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 border-t border-[#232730] px-6 py-4">

                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-semibold text-white transition hover:text-[#e62e45]"
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    className="rounded bg-[#e62e45] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#c82338]"
                                >
                                    {modalMode === 'create'
                                        ? 'Simpan Data ✓'
                                        : 'Update Data ✓'}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            )}

            {/* Modal Konfirmasi Hapus Motor */}
            {isDeleteModalOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsDeleteModalOpen(false);
                            setMotorToDelete(null);
                        }
                    }}
                >
                    <div className="w-full max-w-[440px] rounded-lg border border-[#282c35] bg-[#16181d] p-6 text-[#e1e1e1] shadow-2xl animate-in fade-in zoom-in duration-200">
                        {/* Icon & Title */}
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-7 w-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            
                            <h3 className="text-lg font-bold text-white mb-2">
                                Hapus Data Motor?
                            </h3>
                            
                            <p className="text-sm text-[#8c93a0] leading-relaxed mb-6">
                                Apakah Anda yakin ingin menghapus motor <span className="font-semibold text-white">"{motorToDelete?.nama}"</span>? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setMotorToDelete(null);
                                }}
                                className="flex-1 rounded-md border border-[#2a2e37] bg-[#1a1d24] py-2.5 text-sm font-semibold text-[#8c93a0] transition hover:border-[#3a3f4b] hover:text-white"
                            >
                                Batal
                            </button>
                            
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="flex-1 rounded-md bg-[#e62e45] py-2.5 text-sm font-semibold text-white transition hover:bg-[#c82338] shadow-lg shadow-red-950/20"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

