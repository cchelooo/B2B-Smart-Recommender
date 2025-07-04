export const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/productos/");
    if (!response.ok) throw new Error("Error al obtener productos");
    return await response.json();
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
};
