import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className="min-h-screen bg-ghost-white flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-raisin-black text-center">
          Crear una cuenta
        </h2>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="p-3 rounded bg-silver text-raisin-black placeholder:text-french-gray focus:outline-none"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="p-3 rounded bg-silver text-raisin-black placeholder:text-french-gray focus:outline-none"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="p-3 rounded bg-silver text-raisin-black placeholder:text-french-gray focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="p-3 rounded bg-silver text-raisin-black placeholder:text-french-gray focus:outline-none"
          />
          <button
            type="submit"
            className="bg-raisin-black text-ghost-white py-3 rounded hover:bg-french-gray hover:text-raisin-black transition"
            disabled
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
