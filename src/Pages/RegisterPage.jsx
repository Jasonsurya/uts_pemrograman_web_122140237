// src/pages/RegisterPage.jsx
import React from "react";
import RegisterForm from "../components/RegisterPage_Components/RegisterForm"

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
