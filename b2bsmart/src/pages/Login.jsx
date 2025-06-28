import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/clientes/");
      const clients = await res.json();

      const match = clients.find(
        (c) =>
          c.name.toLowerCase() === name.toLowerCase() &&
          c.email.toLowerCase() === email.toLowerCase()
      );

      if (match) {
        login(match); // ✅ Guardar en contexto
        navigate("/");
      } else {
        alert("❌ Usuario o correo incorrecto");
      }
    } catch (err) {
      alert("❌ Error de red: " + err.message);
    }
  };

  return (
    <main className="min-h-screen bg-ghost-white flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-raisin-black text-center">
          Iniciar sesión
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded bg-silver text-raisin-black"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-silver text-raisin-black"
          />
          <button
            type="submit"
            className="bg-raisin-black text-ghost-white py-3 rounded hover:bg-french-gray hover:text-raisin-black transition"
          >
            Ingresar
          </button>
        </form>

        <p className="text-sm text-center text-french-gray mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-non-photo-blue hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
