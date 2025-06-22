import ProductCarousel from "../components/ProductCarousel";

const Cart = () => {
  const historial = Array.from({ length: 10 }, (_, i) => ({
    name: `Producto ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
  }));

  const recomendados = Array.from({ length: 6 }, (_, i) => ({
    name: `Sugerencia ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
  }));

  return (
    <main className="bg-white h-full p-6 text-raisin-black flex flex-col gap-6">
      {/* Sección superior: carrito vacío */}
      <section className="bg-ghost-white rounded-xl shadow p-6 h-1/2 flex flex-col gap-6">
        <div className="flex flex-1 gap-6">
          {/* Izquierda: Productos (70%) */}
          <div className="w-[70%] bg-silver rounded-lg flex items-center justify-center">
            <p className="text-french-gray">
              Aún no hay productos en el carrito.
            </p>
          </div>

          {/* Derecha: Resumen (30%) */}
          <div className="w-[30%] bg-silver rounded-lg p-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-raisin-black text-center">
                Resumen de tu compra
              </h3>
              <div className="text-sm text-raisin-black">
                <p>
                  Monto total: <span className="font-semibold">$00.000</span>
                </p>
                <p>
                  Costo de envío: <span className="font-semibold">$0.000</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button
                className="bg-non-photo-blue text-white py-2 rounded opacity-50 cursor-not-allowed"
                disabled
              >
                Agregar más productos
              </button>
              <button
                className="bg-raisin-black text-white py-2 rounded opacity-50 cursor-not-allowed"
                disabled
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Carruseles abajo */}
      <section className="h-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductCarousel title="Historial de Compras" items={historial} />
        <ProductCarousel
          title="Recomendaciones Personalizadas"
          items={recomendados}
        />
      </section>
    </main>
  );
};

export default Cart;
