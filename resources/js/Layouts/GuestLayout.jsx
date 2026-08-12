import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B0C10] px-4 py-10">
            <div className="w-full max-w-md">
                <div className="border border-[#262A36] bg-[#16181F] px-6 py-8 shadow-2xl sm:px-8 sm:py-10">
                    {children}
                </div>

                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700 transition hover:text-gray-500"
                    >
                        GARAGETWIN
                    </Link>
                </div>
            </div>
        </div>
    );
}