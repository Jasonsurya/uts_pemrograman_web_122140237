import React, { useState, useEffect } from "react";
import InputField from "../components/RegisterPage_Components/InputField";

const RegisterForm = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (registrationSuccess || error) {
            setLoading(false);
        }
    }, [registrationSuccess, error]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!form.username.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
            setError("Semua field harus diisi.");
            return false;
        }

        if (form.password !== form.confirmPassword) {
            setError("Password dan Konfirmasi tidak cocok.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setRegistrationSuccess(false);
        setLoading(true);

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch("http://localhost:6543/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: form.username.trim(),
                    email: form.email.trim(),
                    password: form.password,
                }),
            });

            const contentType = response.headers.get("content-type");

            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                setError("Terjadi kesalahan pada server. Respon tidak valid.");
                return;
            }

            if (response.status === 201) {
                setRegistrationSuccess(true);
                resetForm();
            } else if (response.status === 409) {
                setError(data.message || "Username atau email sudah terdaftar.");
            } else {
                setError(data.message || "Registrasi gagal. Periksa kembali data Anda.");
            }
        } catch (err) {
            setError("Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.");
        }
    };

    const resetForm = () => {
        setForm({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl shadow-xl max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Daftar Akun Baru</h2>

            {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
            {registrationSuccess && (
                <p className="text-green-500 mb-3 text-center">
                    Pendaftaran berhasil! Silakan login.
                </p>
            )}
            {loading && <p className="text-gray-300 mb-3 text-center">Memproses . . .</p>}

            <InputField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Masukkan username"
            />
            <InputField
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan email"
            />
            <InputField
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
            />
            <InputField
                label="Konfirmasi Password"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password"
            />

            <button
                type="submit"
                className="mt-4 w-full bg-red-600 hover:bg-red-700 transition-colors text-white py-2 px-4 rounded-lg font-semibold"
                disabled={loading}
            >
                {loading ? "Memproses . . ." : "Daftar"}
            </button>
        </form>
    );
};

export default RegisterForm;
