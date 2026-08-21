import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import DetailMotor from '@/Components/DetailMotor';

export default function Dashboard({ auth, motorcycles }) {
    const [selectedMotor, setSelectedMotor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Fallback data in case the database is empty or doesn't match the design
    const defaultMotorcycles = [
        {
            id: 1,
            nama: 'KAWASAKI KLX 150 BF',
            tahun: 2023,
            kilometer: 2500,
            harga: 32500000,
            foto: ['motorcycles/klx.png'],
            is_new: true,
        },
        {
            id: 2,
            nama: 'HONDA CBR250RR',
            tahun: 2022,
            kilometer: 8100,
            harga: 58000000,
            foto: ['motorcycles/cbr.png'],
            is_new: false,
        },
        {
            id: 3,
            nama: 'YAMAHA MT-25',
            tahun: 2021,
            kilometer: 12400,
            harga: 45200000,
            foto: ['motorcycles/mt25.png'],
            is_new: false,
        }
    ];

    const displayMotorcycles = motorcycles && motorcycles.length > 0
        ? motorcycles.map((motor, idx) => ({
            ...motor,
            // Match the "BARU MASUK" badge for the first item
            is_new: idx === 0,
        }))
        : defaultMotorcycles;

    // Smooth scroll helper for SPA feel
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Head>
                <title>GarageTwin - Temukan Motor Impianmu</title>
                <meta name="description" content="Koleksi motor premium pilihan. Kualitas teruji, performa maksimal, dan legalitas terjamin. Wujudkan adrenalin berkendaramu bersama GarageTwin." />
            </Head>

            <div className="min-h-screen bg-[#0a0b0d] text-white font-sans selection:bg-[#dc2626] selection:text-white">
                {/* Hero Section Wrapper with Background */}
                <div
                    className="relative bg-cover bg-center min-h-[90vh] flex flex-col justify-between"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(10, 11, 13, 0.7), rgba(10, 11, 13, 0.95)), url('/images/hero_klx.png')`
                    }}
                >
                    {/* Header/Navbar */}
                    <header className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8 h-20 flex items-center justify-between">
                            {/* Logo */}
                            <Link href="/" className="text-2xl font-black tracking-tight text-white hover:text-red-500 transition duration-300">
                                GARAGETWIN
                            </Link>

                            {/* Center Navigation Links (hidden on mobile) */}
                            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                                <Link
                                    href="/"
                                    className="relative py-2 text-white hover:text-white/80 transition group"
                                >
                                    Beranda
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600"></span>
                                </Link>
                                <Link
                                    href="/katalog"
                                    className="py-2 text-gray-400 hover:text-white transition duration-300"
                                >
                                    Katalog
                                </Link>
                            </nav>

                            {/* Right Actions (hidden on mobile) */}
                            <div className="hidden md:flex items-center space-x-4">
                                {auth?.user ? (
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href="/admin/motor"
                                            className="bg-[#dc2626] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm italic hover:bg-red-700 transition duration-300 transform hover:-translate-y-0.5"
                                        >
                                            ADMIN PANEL
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-gray-400 hover:text-white text-xs font-semibold tracking-wider transition"
                                        >
                                            KELUAR
                                        </Link>
                                    </div>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="bg-[#dc2626] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm italic hover:bg-red-700 transition duration-300 transform hover:-translate-y-0.5"
                                    >
                                        MASUK ADMIN
                                    </Link>
                                )}
                            </div>

                            {/* Mobile Menu Button (visible on mobile only) */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden text-gray-400 hover:text-white focus:outline-none p-2"
                                aria-label="Toggle Menu"
                            >
                                {isMobileMenuOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Mobile Menu Drawer/Dropdown (visible on mobile only) */}
                        {isMobileMenuOpen && (
                            <div className="md:hidden border-t border-white/5 bg-[#0a0b0d]/95 backdrop-blur-md px-6 py-4 space-y-4">
                                <nav className="flex flex-col space-y-3">
                                    <Link
                                        href="/"
                                        className="text-sm font-bold tracking-wider uppercase text-white hover:text-red-500 transition py-2"
                                    >
                                        Beranda
                                    </Link>
                                    <Link
                                        href="/katalog"
                                        className="text-sm font-bold tracking-wider uppercase text-gray-400 hover:text-white transition py-2"
                                    >
                                        Katalog
                                    </Link>
                                </nav>
                                <div className="pt-4 border-t border-white/5 flex flex-col space-y-3">
                                    {auth?.user ? (
                                        <>
                                            <Link
                                                href="/admin/motor"
                                                className="bg-[#dc2626] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm italic hover:bg-red-700 transition duration-300 text-center"
                                            >
                                                ADMIN PANEL
                                            </Link>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="text-gray-400 hover:text-white text-xs font-semibold tracking-wider transition py-2 text-center"
                                            >
                                                KELUAR
                                            </Link>
                                        </>
                                    ) : (
                                        <Link
                                            href={route('login')}
                                            className="bg-[#dc2626] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm italic hover:bg-red-700 transition duration-300 text-center"
                                        >
                                            MASUK ADMIN
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </header>

                    {/* Hero Contents */}
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-20 flex-grow flex flex-col justify-center">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase leading-none text-white">
                                TEMUKAN MOTOR <br />
                                <span className="text-white">IMPIANMU</span>
                            </h1>
                            <p className="mt-6 text-base lg:text-lg text-gray-400 leading-relaxed font-light">
                                Koleksi motor premium pilihan. Kualitas teruji, performa maksimal, dan legalitas terjamin. Wujudkan adrenalin berkendaramu bersama GarageTwin.
                            </p>
                            <div className="mt-10">
                                <Link
                                    href="/katalog"
                                    className="bg-[#dc2626] hover:bg-red-700 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-sm inline-flex items-center space-x-3 transition duration-300 transform hover:scale-[1.02]"
                                >
                                    <span>JELAJAHI KATALOG</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 ml-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <section className="bg-[#08090b] border-y border-white/5 py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">

                            {/* Feature 1 */}
                            <div className="flex flex-col items-center justify-center p-6 md:p-8">
                                <div className="p-3 bg-red-600/10 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-[#dc2626]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.003 21.396a8.5 8.5 0 0 1-5.067-1.637 1 1 0 0 1-.366-.757l-.37-7.4a1 1 0 0 1 .49-.894l5.313-2.952a1 1 0 0 1 1 0l5.313 2.952a1 1 0 0 1 .49.894l-.37 7.4a1 1 0 0 1-.366.757 8.5 8.5 0 0 1-5.067 1.637zm0-15.396-4.5 2.5.314 6.275a6.5 6.5 0 0 0 8.372 0l.314-6.275-4.5-2.5zm2.296 6.81a1 1 0 0 1-1.414 0l-1.59-1.59-1.59 1.59a1 1 0 1 1-1.414-1.414l2.297-2.297a1 1 0 0 1 1.414 0l2.297 2.297c.39.39.39 1.024 0 1.414z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold uppercase tracking-wider text-white">KUALITAS TERUJI</h3>
                                <p className="mt-2 text-sm text-gray-400 max-w-xs">
                                    Melewati inspeksi ketat 150 titik untuk performa optimal.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col items-center justify-center p-6 md:p-8">
                                <div className="p-3 bg-red-600/10 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-[#dc2626]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold uppercase tracking-wider text-white">SURAT LENGKAP</h3>
                                <p className="mt-2 text-sm text-gray-400 max-w-xs">
                                    Dokumen kendaraan terjamin legalitasnya 100%.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex flex-col items-center justify-center p-6 md:p-8">
                                <div className="p-3 bg-red-600/10 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-[#dc2626]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold uppercase tracking-wider text-white">BERGARANSI</h3>
                                <p className="mt-2 text-sm text-gray-400 max-w-xs">
                                    Garansi mesin dan transmisi untuk ketenangan pikiran.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Motor Terbaru Section */}
                <section id="motor-terbaru" className="py-24 bg-[#0a0b0d]">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="flex items-end justify-between border-b border-white/5 pb-6 mb-12">
                            <h2 className="text-3xl lg:text-4xl font-extrabold uppercase tracking-wider">
                                MOTOR <span className="text-[#dc2626]">TERBARU</span>
                            </h2>
                            <Link
                                href="/katalog"
                                className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition flex items-center space-x-2"
                            >
                                <span>LIHAT SEMUA</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>

                        {/* Motorcycle Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {displayMotorcycles.map((motor) => {
                                // Image path resolution
                                const imageSrc = motor.foto && motor.foto[0]
                                    ? (motor.foto[0].startsWith('http') || motor.foto[0].startsWith('/')
                                        ? motor.foto[0]
                                        : `/storage/${motor.foto[0]}`)
                                    : '/images/klx.png';

                                return (
                                    <div
                                        key={motor.id}
                                        onClick={() => { setSelectedMotor(motor); setIsModalOpen(true); }}
                                        className="bg-[#12141a] border border-white/5 overflow-hidden flex flex-col group hover:border-white/10 transition duration-300 cursor-pointer"
                                    >
                                        {/* Image Area */}
                                        <div className="relative overflow-hidden aspect-[4/3] bg-black/40 flex items-center justify-center">
                                            <img
                                                src={imageSrc}
                                                alt={motor.nama}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                            {/* "BARU MASUK" Badge */}
                                            {motor.is_new && (
                                                <div className="absolute top-4 left-4 bg-[#dc2626] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 transform -skew-x-12">
                                                    BARU MASUK
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Contents */}
                                        <div className="p-6 flex-grow flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-lg font-extrabold uppercase tracking-tight text-white group-hover:text-red-500 transition duration-300">
                                                        {motor.nama}
                                                    </h3>
                                                    <span className="bg-[#21232b] text-gray-400 text-xs font-bold px-2 py-0.5 rounded-sm">
                                                        {motor.tahun}
                                                    </span>
                                                </div>
                                                {/* Kilometer (mileage) formatting */}
                                                <div className="flex items-center text-xs text-gray-400 space-x-2 mt-2">
                                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V12h3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>@ {motor.kilometer.toLocaleString('en-US')} km</span>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="mt-6 border-t border-white/5 pt-4">
                                                <span className="text-xl font-black text-[#dc2626]">
                                                    Rp {motor.harga.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#0b0c10] border-t border-white/5 pt-16 pb-12 text-[#8c93a0]">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/5">

                            {/* Left Column - Brand & Info */}
                            <div className="lg:col-span-8 flex flex-col space-y-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-black rounded-lg border border-red-600/30 flex items-center justify-center font-black italic tracking-tighter text-sm">
                                        <span className="text-white">G</span>
                                        <span className="text-[#dc2626]">T</span>
                                    </div>
                                    <span className="text-xl font-bold tracking-tight text-white">Garage Twin</span>
                                </div>

                                <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                                    Showroom motor bekas berkualitas premium. Kami melayani jual-beli, tukar-tambah, dan cash/kredit dengan proses tercepat.
                                </p>

                                <div className="space-y-3.5 pt-2">
                                    <div className="flex items-start space-x-3 text-sm text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        <span>Jl. Raya Otomotif No. 45, Jakarta Selatan</span>
                                    </div>

                                    <div className="flex items-start space-x-3 text-sm text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.145-.44.02-.927.53-.387.71l1.293-.97c.361-.271.528-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                        <span>+62 812-3456-7890 (Showroom Admin)</span>
                                    </div>

                                    <div className="flex items-start space-x-3 text-sm text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Setiap Hari: 09.00 - 18.00 WIB</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Map */}
                            <div className="lg:col-span-4">
                                <div className="relative w-full h-[180px] rounded-xl overflow-hidden border border-white/5 bg-[#12141a] group shadow-lg">
                                    {/* Floating Label */}
                                    <div className="absolute top-3 left-3 z-10 bg-[#2d3139]/95 backdrop-blur-sm px-2.5 py-1.5 rounded-md border border-white/5 flex items-center space-x-2 text-[10px] font-bold text-white shadow-md">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                                        <span className="w-2 h-2 rounded-full bg-red-500 absolute left-2.5"></span>
                                        <span>Garage Twin Showroom</span>
                                    </div>

                                    {/* SVG Map Illustration */}
                                    <svg className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="400" height="200" fill="#f4f3ef" />

                                        {/* Water Body/Parks */}
                                        <path d="M 0 160 Q 90 170 130 200 L 0 200 Z" fill="#e2ede4" />
                                        <path d="M 320 0 Q 350 40 400 30 L 400 0 Z" fill="#dcedde" />

                                        {/* Secondary Roads */}
                                        <path d="M 0 40 L 400 40 M 0 160 L 400 160 M 80 0 L 80 200 M 320 0 L 320 200" stroke="#ffffff" strokeWidth="4" />
                                        <path d="M 0 40 L 400 40 M 0 160 L 400 160 M 80 0 L 80 200 M 320 0 L 320 200" stroke="#e8e7da" strokeWidth="2" />

                                        {/* Main Highway Intersecting at 240, 110 */}
                                        <path d="M -10 130 L 410 70" stroke="#ffffff" strokeWidth="8" />
                                        <path d="M -10 130 L 410 70" stroke="#dfddca" strokeWidth="6" />

                                        <path d="M 240 -10 L 240 210" stroke="#ffffff" strokeWidth="8" />
                                        <path d="M 240 -10 L 240 210" stroke="#dfddca" strokeWidth="6" />

                                        {/* Minor roads */}
                                        <path d="M 140 40 L 140 160 M 200 40 L 200 160" stroke="#ffffff" strokeWidth="4" />
                                        <path d="M 140 40 L 140 160 M 200 40 L 200 160" stroke="#eae8d9" strokeWidth="2.5" />

                                        {/* Blue Pin Marker at intersection 240, 102 */}
                                        <g transform="translate(240, 102)">
                                            <ellipse cx="0" cy="12" rx="6" ry="2" fill="rgba(0,0,0,0.18)" />
                                            <path d="M 0 0 C -7 -7 -10 -14 -10 -20 C -10 -28 -5 -33 0 -33 C 5 -33 10 -28 10 -20 C 10 -14 7 -7 0 0 Z" fill="#2563eb" />
                                            <circle cx="0" cy="-20" r="4" fill="#ffffff" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Bottom copyright & Socials */}
                        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
                            <p className="text-xs text-gray-500">
                                &copy; 2026 Garage Twin. All rights reserved.
                            </p>

                            <div className="flex items-center space-x-4">
                                <a href="#" className="text-gray-500 hover:text-white transition duration-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                                    </svg>
                                </a>

                                <a href="#" className="text-gray-500 hover:text-white transition duration-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                </a>

                                <a href="#" className="text-gray-500 hover:text-white transition duration-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                                        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>

                {/* Motor Detail Modal */}
                <DetailMotor
                    motor={selectedMotor}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </>
    );
}
