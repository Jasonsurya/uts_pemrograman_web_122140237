// src/components/Register/RegisterForm.jsx
import React, { useState } from "react";
import InputField from "./InputField";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Password dan Konfirmasi tidak cocok.");
      return;
    }

    setError("");

    // Simulasi kirim ke backend
    console.log("Data Dikirim:", form);

    // Reset form
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl shadow-xl max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-4">Daftar Akun Baru</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

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
      >
        Daftar
      </button>
    </form>
  );
};

export default RegisterForm;
