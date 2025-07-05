import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      sector,
      password,
      rol: "cliente",
    };

    try {
      const res = await fetch(`${BACKEND_URL}/clientes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Registro exitoso");

        // Guardar la sesión en localStorage
        localStorage.setItem("user", JSON.stringify({ name, email }));

        // Redirigir al home
        navigate("/");
      } else {
        alert("❌ Error: " + (data.error || data.message || "Desconocido"));
      }
    } catch (err) {
      alert("❌ Error de red: " + err.message);
    }
  };

  return (
    <main className="min-h-screen bg-ghost-white flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-raisin-black text-center">
          Crear una cuenta
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded bg-silver text-raisin-black placeholder:text-french-gray focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-silver text-raisin-black placeholder:text-french-gray focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Sector (opcional)"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="p-3 rounded bg-silver text-raisin-black placeholder:text-french-gray focus:outline-none"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-silver text-raisin-black placeholder:text-french-gray focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-raisin-black text-ghost-white py-3 rounded hover:bg-french-gray hover:text-raisin-black transition"
          >
            Registrarse
          </button>
        </form>

        <p className="text-sm text-center text-french-gray mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-non-photo-blue hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
