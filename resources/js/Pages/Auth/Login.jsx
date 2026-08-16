import { useState } from 'react';
import InputError from '@/Components/InputError';
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
        <>
            <Head title="Login Admin" />

            <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">

                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl border border-[#1f2229] bg-[#0b0e14] shadow-2xl">

                    {/* LEFT SIDE */}
                    <div
                        className="relative min-h-[420px] md:min-h-[560px] flex flex-col justify-end p-8 md:p-10 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('/images/login_motor.jpg')",
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        {/* Hero Text */}
                        <div className="relative z-10">
                            <div className="w-8 h-[3px] bg-red-600 mb-3" />

                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide leading-tight uppercase text-white mb-2">
                                Uncompromising
                                <br />
                                Performance
                            </h1>

                            <p className="text-[11px] text-zinc-400 tracking-widest font-mono uppercase">
                                Admin Access Portal &bull; Secure Environment
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="min-h-[560px] p-8 md:p-12 flex flex-col justify-between bg-[#0b0e14]">

                        <div>

                            {/* BRAND */}
                            <Link href="/" className="inline-block">
                                <h2 className="text-xl font-extrabold tracking-wider uppercase text-white">
                                    GARAGE
                                    <span className="text-red-600">TWIN</span>
                                </h2>
                            </Link>

                            {/* TITLE */}
                            <div className="mt-12 mb-8">
                                <h3 className="text-2xl font-bold text-white mb-1">
                                    Login Admin
                                </h3>

                                <p className="text-sm text-zinc-400">
                                    Silahkan masuk ke dasbor Anda
                                </p>
                            </div>

                            {/* STATUS */}
                            {status && (
                                <div className="mb-5 border border-green-900 bg-green-950/40 px-4 py-3 text-sm text-green-400">
                                    {status}
                                </div>
                            )}

                            {/* FORM */}
                            <form
                                onSubmit={submit}
                                className="space-y-4"
                            >

                                {/* EMAIL */}
                                <div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        autoFocus
                                        placeholder="Email"
                                        onChange={(e) =>
                                            setData(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-md border border-zinc-800/80 bg-[#12161f] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-red-600"
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                {/* PASSWORD */}
                                <div>
                                    <div className="relative">

                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            name="password"
                                            value={data.password}
                                            autoComplete="current-password"
                                            placeholder="Kata Sandi"
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-md border border-zinc-800/80 bg-[#12161f] px-4 py-3 pr-24 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-red-600"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500 transition hover:text-white"
                                            aria-label={
                                                showPassword
                                                    ? 'Sembunyikan password'
                                                    : 'Lihat password'
                                            }
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

                                {/* SUBMIT */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-4 w-full rounded-md bg-[#e61e38] px-4 py-3 font-bold italic tracking-wider text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing
                                        ? 'MEMPROSES...'
                                        : 'MASUK'}
                                </button>

                            </form>

                        </div>

                        {/* FOOTER */}
                        <div className="mt-8 pt-4 text-center">
                            <p className="text-[10px] text-zinc-500 tracking-widest uppercase">
                                Portal Akses Terenkripsi
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

