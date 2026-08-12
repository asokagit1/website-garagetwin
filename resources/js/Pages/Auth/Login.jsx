import { useState } from 'react';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <div className="w-full">
                {/* Brand */}
                <div className="mb-10 text-center">
                    <Link href="/" className="inline-block">
                        <h1 className="text-2xl font-black tracking-tight text-white">
                            GARAGE
                            <span className="text-red-600">TWIN</span>
                        </h1>
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-black uppercase leading-tight tracking-tight text-white">
                        Masuk
                        <span className="text-red-600"> Akun</span>
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        Masuk untuk mengakses GarageTwin dan mengelola
                        koleksi motor kamu.
                    </p>
                </div>

                {/* Status */}
                {status && (
                    <div className="mb-5 border border-green-900 bg-green-950/40 px-4 py-3 text-sm text-green-400">
                        {status}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={submit}>
                    {/* Email */}
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            placeholder="nama@email.com"
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full border border-[#262A36] bg-[#0B0C10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-red-600 focus:ring-1 focus:ring-red-600"
                            style={{
                                WebkitTextFillColor: '#FFFFFF',
                                WebkitBoxShadow: '0 0 0px 1000px #0B0C10 inset',
                            }}
                        />

                        <InputError
                            message={errors.email}
                            className="mt-2"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-7">
                        <label
                            htmlFor="password"
                            className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400"
                        >
                            Kata Sandi
                        </label>

                        <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) =>
                            setData('password', e.target.value)
                        }
                        className="w-full border border-[#262A36] bg-[#0B0C10] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-red-600 focus:ring-1 focus:ring-red-600"
                        style={{
                            WebkitTextFillColor: '#FFFFFF',
                            WebkitBoxShadow: '0 0 0px 1000px #0B0C10 inset',
                        }}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 transition hover:text-white"
                        aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 5 12 5c4.64 0 8.577 2.51 9.964 6.678.04.12.04.25 0 .644C20.577 16.49 16.64 19 12 19c-4.64 0-8.577-2.51-9.964-6.678z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19 12 19c.937 0 1.845-.116 2.704-.335M6.228 6.228A10.45 10.45 0 0112 5c4.756 0 8.773 2.662 10.066 7a10.47 10.47 0 01-1.249 2.527M6.228 6.228L3 3m3.228 3.228l12.544 12.544M9.88 9.88a3 3 0 104.24 4.24"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-red-600 px-4 py-3.5 text-sm font-black uppercase tracking-wider text-white transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-[#16181F] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Memproses...' : 'Masuk Sekarang'}
                    </button>
                </form>

                {/* Back to Home */}
                <div className="mt-7 border-t border-[#262A36] pt-6 text-center">
                    <Link
                        href="/"
                        className="text-xs font-semibold uppercase tracking-wider text-gray-600 transition hover:text-white"
                    >
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}