import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import DetailMotor from '@/Components/DetailMotor';

export default function KatalogMotor({ auth, motorcycles }) {
    const [sortBy, setSortBy] = useState('Terbaru');
    const [selectedMotor, setSelectedMotor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Default mock data to guarantee the page displays correctly if database is empty
    const defaultMotorcycles = [
        {
            id: 1,
            nama: 'Kawasaki KLX 150 BF',
            tahun: 2022,
            kilometer: 8500,
            kategori: 'manual',
            harga: 32500000,
            status: 'tersedia',
            foto: ['motorcycles/klx.png'],
            is_featured: true,
            is_new: false,
        },
        {
            id: 2,
            nama: 'Honda Vario 160 ABS',
            tahun: 2023,
            kilometer: 3200,
            kategori: 'matik',
            harga: 28000000,
            status: 'tersedia',
            foto: ['motorcycles/vario.png'],
            is_featured: false,
            is_new: false,
        },
        {
            id: 3,
            nama: 'Yamaha R15M Connected',
            tahun: 2022,
            kilometer: 12000,
            kategori: 'manual',
            harga: 42500000,
            status: 'tersedia',
            foto: ['motorcycles/r15.png'],
            is_featured: false,
            is_new: false,
        },
        {
            id: 4,
            nama: 'Vespa Sprint 150 i-get',
            tahun: 2021,
            kilometer: 15500,
            kategori: 'matik',
            harga: 48000000,
            status: 'tersedia',
            foto: ['motorcycles/vespa.png'],
            is_featured: false,
            is_new: false,
        },
        {
            id: 5,
            nama: 'Honda CB150X',
            tahun: 2023,
            kilometer: 1500,
            kategori: 'manual',
            harga: 31800000,
            status: 'tersedia', // Displayed as "Baru Masuk" in mockup
            foto: ['motorcycles/cb150x.png'],
            is_featured: false,
            is_new: true, // Used for the "Baru Masuk" badge
        }
    ];

    // Combine or fallback to default data
    const allMotorcycles = motorcycles && motorcycles.length > 0 
        ? motorcycles.map((motor, idx) => ({
            ...motor,
            // First item (Kawasaki KLX) is featured as wide card
            is_featured: motor.nama.toLowerCase().includes('klx') || idx === 0,
            // Last item or Honda CB150X is marked as "Baru Masuk"
            is_new: motor.nama.toLowerCase().includes('cb150x') || idx === 4,
          }))
        : defaultMotorcycles;

    return (
        <>
            <Head>
                <title>Katalog Motor - GarageTwin</title>
                <meta name="description" content="Jelajahi koleksi motor bekas berkualitas tinggi kami yang telah melalui inspeksi ketat." />
            </Head>

            <div className="min-h-screen bg-[#0a0b0d] text-white font-sans selection:bg-[#dc2626] selection:text-white">
                
                {/* Header/Navbar */}
                <header className="border-b border-white/5 bg-[#0a0b0d]/90 backdrop-blur-md sticky top-0 z-50">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 h-20 flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-black tracking-tight text-white hover:text-red-500 transition duration-300">
                            GARAGETWIN
                        </Link>

                        {/* Navigation Links (hidden on mobile) */}
                        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                            <Link 
                                href="/" 
                                className="py-2 text-gray-400 hover:text-white transition duration-300"
                            >
                                Beranda
                            </Link>
                            <Link 
                                href="/katalog" 
                                className="relative py-2 text-white hover:text-white/85 transition group"
                            >
                                Katalog
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600"></span>
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
                                    className="text-sm font-bold tracking-wider uppercase text-gray-400 hover:text-white transition py-2"
                                >
                                    Beranda
                                </Link>
                                <Link 
                                    href="/katalog" 
                                    className="text-sm font-bold tracking-wider uppercase text-white hover:text-red-500 transition py-2"
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

                {/* Main Body */}
                <main className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                    
                    {/* Catalog Header with Sort Dropdown */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-wider">
                                KATALOG <span className="text-[#dc2626]">MOTOR</span>
                            </h1>
                            <p className="mt-4 text-base text-gray-400 font-light max-w-2xl">
                                Jelajahi koleksi motor bekas berkualitas tinggi kami yang telah melalui inspeksi ketat.
                            </p>
                        </div>

                        {/* Sorting dropdown */}
                        <div className="flex items-center space-x-3 self-start md:self-auto">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Urutkan:</span>
                            <div className="relative">
                                <select 
                                    value={sortBy} 
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-[#12141a] border border-white/10 text-sm font-semibold rounded-sm py-2 pl-4 pr-10 focus:outline-none focus:border-red-500 appearance-none text-white cursor-pointer"
                                >
                                    <option>Terbaru</option>
                                    <option>Harga Terendah</option>
                                    <option>Harga Tertinggi</option>
                                    <option>Kilometer Terendah</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Catalog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {allMotorcycles.map((motor) => {
                            // Resolve correct image source path
                            const imageSrc = motor.foto && motor.foto[0]
                                ? (motor.foto[0].startsWith('http') || motor.foto[0].startsWith('/') 
                                    ? motor.foto[0] 
                                    : `/storage/${motor.foto[0]}`)
                                : '/images/klx.png';

                            // Format price
                            const formattedPrice = `Rp ${motor.harga.toLocaleString('id-ID')}`;
                            // Format mileage (uses English comma style formatting like "@ 8,500 KM" in the mockup)
                            const formattedKm = `${motor.kilometer.toLocaleString('en-US')} KM`;

                            if (motor.is_featured) {
                                // Featured wide layout card (Kawasaki KLX)
                                return (
                                    <div 
                                        key={motor.id}
                                        className="col-span-1 md:col-span-2 relative border border-white/5 group hover:border-white/10 transition duration-300 min-h-[350px] flex flex-col justify-between p-8 overflow-hidden"
                                    >
                                        {/* Background Image */}
                                        <img 
                                            src={imageSrc} 
                                            alt={motor.nama} 
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 z-0" 
                                        />

                                        {/* Responsive Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b0d]/95 via-[#0a0b0d]/80 to-[#0a0b0d]/40 md:bg-gradient-to-r md:from-[#0a0b0d]/95 md:via-[#0a0b0d]/70 md:to-transparent z-0" />

                                        {/* Top Badges */}
                                        <div className="relative z-10 flex space-x-2">
                                            <span className="bg-[#dc2626] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
                                                TERSEDIA
                                            </span>
                                            <span className="bg-[#2a2d35] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
                                                PILIHAN AHLI
                                            </span>
                                        </div>

                                        {/* Center Info */}
                                        <div className="relative z-10 mt-auto">
                                            <h2 className="text-3xl font-black italic uppercase tracking-tight text-white group-hover:text-red-500 transition duration-300 mb-4">
                                                {motor.nama}
                                            </h2>

                                            {/* Details Icons */}
                                            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-300 font-bold uppercase tracking-wider">
                                                <div className="flex items-center space-x-2">
                                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                                    </svg>
                                                    <span>{motor.tahun}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V12h3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{formattedKm}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="capitalize">{motor.kategori}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Price & Button */}
                                        <div className="relative z-10 flex justify-between items-end mt-6">
                                            <span className="text-2xl font-black text-[#dc2626]">
                                                {formattedPrice}
                                            </span>
                                            <button 
                                                onClick={() => { setSelectedMotor(motor); setIsModalOpen(true); }}
                                                className="border border-white hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 transition duration-300 cursor-pointer"
                                            >
                                                DETAIL
                                            </button>
                                        </div>
                                    </div>
                                );
                            } else {
                                // Standard vertical layout card
                                return (
                                    <div 
                                        key={motor.id}
                                        className="bg-[#12141a] border border-white/5 overflow-hidden flex flex-col group hover:border-white/10 transition duration-300"
                                    >
                                        {/* Image Area */}
                                        <div className="relative overflow-hidden aspect-[4/3] bg-black/40 flex items-center justify-center">
                                            <img 
                                                src={imageSrc} 
                                                alt={motor.nama} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                                            />
                                            {/* Status Badge (Tersedia or Baru Masuk) */}
                                            <div className="absolute top-4 right-4">
                                                {motor.is_new ? (
                                                    <span className="bg-[#dc2626] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                                                        Baru Masuk
                                                    </span>
                                                ) : (
                                                    <span className="bg-[#dc2626] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                                                        Tersedia
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Card Contents */}
                                        <div className="p-6 flex-grow flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold italic tracking-tight text-white group-hover:text-red-500 transition duration-300">
                                                    {motor.nama}
                                                </h3>
                                                {/* Specs Details */}
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-2">
                                                    {motor.tahun} &nbsp;&bull;&nbsp; {formattedKm} &nbsp;&bull;&nbsp; <span className="capitalize">{motor.kategori}</span>
                                                </p>
                                            </div>

                                            {/* Bottom Price & Link */}
                                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                                                <span className="text-base font-bold text-gray-300">
                                                    {formattedPrice}
                                                </span>
                                                <button 
                                                    onClick={() => { setSelectedMotor(motor); setIsModalOpen(true); }}
                                                    className="text-white group-hover:text-[#dc2626] transition duration-300 transform group-hover:translate-x-1 cursor-pointer"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-20 space-x-2">
                        {/* Prev button */}
                        <button className="bg-[#12141a] hover:bg-[#dc2626] border border-white/5 text-gray-400 hover:text-white w-10 h-10 flex items-center justify-center rounded-sm transition cursor-pointer">
                            &lt;
                        </button>
                        {/* Active Page 1 */}
                        <button className="bg-[#dc2626] text-white w-10 h-10 flex items-center justify-center rounded-sm font-bold transition">
                            1
                        </button>
                        {/* Page 2 */}
                        <button className="bg-[#12141a] hover:bg-[#dc2626]/20 border border-white/5 text-gray-400 hover:text-white w-10 h-10 flex items-center justify-center rounded-sm transition cursor-pointer">
                            2
                        </button>
                        {/* Page 3 */}
                        <button className="bg-[#12141a] hover:bg-[#dc2626]/20 border border-white/5 text-gray-400 hover:text-white w-10 h-10 flex items-center justify-center rounded-sm transition cursor-pointer">
                            3
                        </button>
                        {/* Ellipsis */}
                        <span className="text-gray-500 w-10 h-10 flex items-center justify-center font-bold">
                            ...
                        </span>
                        {/* Next button */}
                        <button className="bg-[#12141a] hover:bg-[#dc2626] border border-white/5 text-gray-400 hover:text-white w-10 h-10 flex items-center justify-center rounded-sm transition cursor-pointer">
                            &gt;
                        </button>
                    </div>

                </main>

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
