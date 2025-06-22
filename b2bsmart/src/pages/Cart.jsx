import ProductCarousel from "../components/ProductCarousel";

const Cart = () => {
  const historial = [
    { name: "Producto 1", price: 12.99 },
    { name: "Producto 2", price: 9.5 },
    { name: "Producto 3", price: 20.0 },
    { name: "Producto 4", price: 5.75 },
  ];

  const recomendados = [
    { name: "Sugerencia 1", price: 13.49 },
    { name: "Sugerencia 2", price: 7.25 },
    { name: "Sugerencia 3", price: 15.0 },
  ];

  return (
    <main className="bg-ghost-white min-h-screen p-6 text-raisin-black flex flex-col gap-6">
      {/* Carrito */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
        <p className="text-french-gray">Aún no hay productos en el carrito.</p>
      </section>

      {/* Historial y recomendaciones */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[250px]">
          <ProductCarousel title="Historial de Compras" items={historial} />
        </div>
        <div className="h-[250px]">
          <ProductCarousel
            title="Recomendaciones Personalizadas"
            items={recomendados}
          />
        </div>
      </section>
    </main>
  );
};

export default Cart;
