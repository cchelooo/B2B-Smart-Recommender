import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // Elegir productos aleatorios
  const randomProducts = products.sort(() => 0.5 - Math.random());
  const heroProduct = randomProducts[0];
  const ofertas = randomProducts.slice(1, 7);

  return (
    <main className="bg-white text-raisin-black flex flex-col">
      {/* Imagen destacada */}
      <div className="h-[50vh] w-full">
        {heroProduct ? (
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-silver flex items-center justify-center">
            <p className="text-french-gray">Cargando imagen destacada...</p>
          </div>
        )}
      </div>

      {/* Ofertas destacadas */}
      <section className="bg-ghost-white p-6 h-[40vh]">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Ofertas destacadas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ofertas.length > 0 ? (
            ofertas.map((item, index) => (
              <div
                key={index}
                className="bg-silver rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center"
              >
                <div className="w-full h-44 bg-white rounded mb-2 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="font-medium text-raisin-black text-sm truncate">
                  {item.name}
                </p>
                <p className="text-non-photo-blue text-sm font-bold">
                  ${parseFloat(item.price).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-french-gray col-span-6">
              Cargando productos...
            </p>
          )}
        </div>
      </section>

      {/* Dos bloques adicionales debajo */}
      <section className="flex w-full h-[50vh]">
        <div className="w-1/2 bg-raisin-black text-ghost-white p-6 flex flex-col justify-between">
          <h3 className="text-xl font-bold">Computación</h3>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm opacity-70">Contenido o imagen futura</p>
          </div>
        </div>
        <div className="w-1/2 bg-french-gray text-raisin-black p-6 flex flex-col justify-between">
          <h3 className="text-xl font-bold">Electrodomésticos</h3>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm opacity-70">Contenido o imagen futura</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
