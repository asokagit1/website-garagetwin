import { useEffect, useState } from 'react';

export default function DetailMotor({ motor, isOpen, onClose }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Reset active image when motor changes
    useEffect(() => {
        setActiveImageIndex(0);
    }, [motor]);

    if (!isOpen || !motor) return null;

    // Resolve images
    const images = motor.foto && motor.foto.length > 0 ? motor.foto : ['motorcycles/klx.png'];
    
    // Fallback/padded thumbnails to match 4 thumbnails layout if motor has fewer
    const thumbnails = [...images];
    while (thumbnails.length < 4) {
        thumbnails.push(images[0]);
    }
    // Limit to 4 thumbnails for visual layout symmetry
    const displayThumbnails = thumbnails.slice(1, 5);

    // If there's only 1 image, let's just show that image as the thumbnails too to fill the grid
    const getThumbnailSrc = (path) => {
        return path.startsWith('http') || path.startsWith('/') ? path : `/storage/${path}`;
    };

    const activeImageSrc = images[activeImageIndex] 
        ? (images[activeImageIndex].startsWith('http') || images[activeImageIndex].startsWith('/') 
            ? images[activeImageIndex] 
            : `/storage/${images[activeImageIndex]}`)
        : '/images/klx.png';

    // Format price
    const formattedPrice = `Rp ${motor.harga.toLocaleString('id-ID')}`;
    
    // Format mileage
    const formattedKm = `${motor.kilometer.toLocaleString('id-ID')} KM`;

    // WhatsApp link helper
    const handleWhatsAppClick = () => {
        const message = `Halo GarageTwin, saya tertarik dengan motor ${motor.nama} (${motor.tahun}) yang dijual seharga ${formattedPrice}. Apakah unit ini masih tersedia?`;
        const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
            {/* Modal Box */}
            <div className="relative w-full max-w-5xl bg-[#0c0d10] border border-white/5 rounded-md flex flex-col md:flex-row overflow-hidden shadow-2xl animate-fade-in my-8">
                
                {/* Close Button (X in a circle) */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/40 border border-white/10 hover:border-white/20 p-2 rounded-full transition duration-300 z-10 cursor-pointer"
                    aria-label="Tutup Detail"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left Side: Images Gallery */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
                    {/* Active Main Image */}
                    <div className="w-full aspect-[4/3] bg-black/30 rounded-sm overflow-hidden flex items-center justify-center">
                        <img 
                            src={activeImageSrc} 
                            alt={motor.nama} 
                            className="w-full h-full object-cover" 
                        />
                    </div>

                    {/* Gallery Thumbnails (Grid of 4 items) */}
                    <div className="grid grid-cols-4 gap-4 mt-6">
                        {/* Main image thumbnail (index 0) */}
                        <div 
                            onClick={() => setActiveImageIndex(0)}
                            className={`aspect-[4/3] bg-black/40 rounded-sm overflow-hidden border transition duration-300 cursor-pointer ${
                                activeImageIndex === 0 ? 'border-[#dc2626] scale-95' : 'border-transparent hover:border-white/25'
                            }`}
                        >
                            <img src={getThumbnailSrc(images[0])} alt="thumbnail 1" className="w-full h-full object-cover" />
                        </div>

                        {/* Additional detail thumbnails */}
                        {images.slice(1, 4).map((imgUrl, idx) => {
                            const actualIndex = idx + 1;
                            return (
                                <div 
                                    key={actualIndex}
                                    onClick={() => setActiveImageIndex(actualIndex)}
                                    className={`aspect-[4/3] bg-black/40 rounded-sm overflow-hidden border transition duration-300 cursor-pointer ${
                                        activeImageIndex === actualIndex ? 'border-[#dc2626] scale-95' : 'border-transparent hover:border-white/25'
                                    }`}
                                >
                                    <img src={getThumbnailSrc(imgUrl)} alt={`thumbnail ${actualIndex + 1}`} className="w-full h-full object-cover" />
                                </div>
                            );
                        })}

                        {/* Padded empty/duplicate thumbnails if motorcycle has fewer than 4 images */}
                        {images.length < 4 && [...Array(4 - images.length)].map((_, idx) => {
                            const duplicateIndex = 0;
                            return (
                                <div 
                                    key={`padded-${idx}`}
                                    onClick={() => setActiveImageIndex(duplicateIndex)}
                                    className={`aspect-[4/3] bg-black/40 rounded-sm overflow-hidden border transition duration-300 cursor-pointer ${
                                        activeImageIndex === duplicateIndex ? 'border-[#dc2626] scale-95' : 'border-transparent hover:border-white/10 opacity-60'
                                    }`}
                                >
                                    <img src={getThumbnailSrc(images[0])} alt="padded thumbnail" className="w-full h-full object-cover" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side: Details Info */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                        {/* Status Badge */}
                        <div className="mb-4">
                            <span className="bg-[#dc2626] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                                {motor.status === 'tersedia' ? 'Tersedia' : 'Baru Masuk'}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white leading-tight">
                            {motor.nama}
                        </h2>

                        {/* Price */}
                        <span className="text-2xl font-black italic text-[#dc2626] mt-2 block">
                            {formattedPrice}
                        </span>

                        {/* 2x2 Specs Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            
                            {/* Brand */}
                            <div className="bg-[#12141a] border border-white/5 p-4 rounded-sm">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Brand</span>
                                <span className="text-lg font-extrabold text-white mt-1 block capitalize">
                                    {motor.brand?.nama || 'Kawasaki'}
                                </span>
                            </div>

                            {/* Kategori */}
                            <div className="bg-[#12141a] border border-white/5 p-4 rounded-sm">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Kategori</span>
                                <span className="text-lg font-extrabold text-white mt-1 block capitalize">
                                    {motor.kategori}
                                </span>
                            </div>

                            {/* Tahun */}
                            <div className="bg-[#12141a] border border-white/5 p-4 rounded-sm">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Tahun</span>
                                <span className="text-lg font-extrabold text-white mt-1 block">
                                    {motor.tahun}
                                </span>
                            </div>

                            {/* Kilometer */}
                            <div className="bg-[#12141a] border border-white/5 p-4 rounded-sm">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Kilometer</span>
                                <span className="text-lg font-extrabold text-white mt-1 block">
                                    {formattedKm}
                                </span>
                            </div>

                        </div>

                        {/* Condition Description */}
                        <div className="mt-8">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Deskripsi Kondisi</h4>
                            <p className="text-sm text-gray-400 font-light leading-relaxed">
                                {motor.nama.toLowerCase().includes('klx') 
                                    ? 'Motor dalam kondisi sangat terawat, pemakaian pribadi. Servis rutin selalu di bengkel resmi Kawasaki. Bodi mulus, mesin halus, kelistrikan normal. Pajak hidup panjang. Ban masih tebal, siap diajak trabas maupun harian. Silakan hubungi untuk cek unit langsung.'
                                    : motor.deskripsi || 'Motor bekas berkualitas tinggi, sudah melalui pemeriksaan ketat 150 titik. Kondisi mesin prima, surat-surat lengkap dan siap pakai.'
                                }
                            </p>
                        </div>
                    </div>

                    {/* WhatsApp CTA Button */}
                    <div className="mt-10">
                        <button 
                            onClick={handleWhatsAppClick}
                            className="w-full bg-[#22c55e] hover:bg-green-600 text-white font-bold uppercase tracking-wider py-4 rounded-sm flex items-center justify-center space-x-3 transition duration-300 transform hover:scale-[1.01] cursor-pointer"
                        >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.52 3.449A11.898 11.898 0 0 0 12.03 0C5.462 0 .11 5.348.107 11.918c0 2.1.547 4.15 1.587 5.95L0 24l6.335-1.662c1.746.952 3.71 1.454 5.702 1.455h.005c6.564 0 11.917-5.35 11.92-11.922a11.838 11.838 0 0 0-3.442-8.422zM12.03 21.84h-.004c-1.78-.001-3.528-.479-5.052-1.38l-.362-.214-3.756.985.999-3.664-.235-.374a9.904 9.904 0 0 1-1.52-5.274c.003-5.478 4.464-9.936 9.943-9.936 2.652.001 5.146 1.033 7.022 2.912a9.858 9.858 0 0 1 2.916 7.034c-.004 5.48-4.464 9.937-9.947 9.937zm5.452-7.447c-.299-.15-1.767-.872-2.04-.972-.274-.1-.474-.15-.674.15-.2.3-.774.973-.95 1.173-.174.2-.349.224-.648.074a8.163 8.163 0 0 1-2.408-1.484 9.006 9.006 0 0 1-1.665-2.073c-.174-.3-.018-.462.13-.61.136-.135.3-.35.45-.525.15-.175.2-.299.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.623-.924-2.223-.244-.587-.492-.508-.674-.518-.174-.01-.374-.01-.574-.01a1.1 1.1 0 0 0-.799.375c-.274.3-1.047 1.023-1.047 2.496s1.073 2.895 1.223 3.095c.15.2 2.11 3.22 5.11 4.516.714.308 1.272.493 1.707.632.717.228 1.37.195 1.887.118.577-.087 1.767-.723 2.016-1.422.25-.699.25-1.297.175-1.422-.075-.125-.274-.2-.574-.35z"/>
                            </svg>
                            <span>Chat via WhatsApp</span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}
