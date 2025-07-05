const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/productos/`);
    if (!response.ok) throw new Error("Error al obtener productos");
    return await response.json();
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
};
