const Home = () => {
  const ofertas = Array.from({ length: 6 }, (_, i) => ({
    name: `Oferta ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
  }));

  return (
    <main className="bg-white text-raisin-black flex flex-col">
      {/* Imagen destacada */}
      <div className="h-[50vh] w-full">
        <img
          src="https://via.placeholder.com/1920x600?text=Imagen+Principal"
          alt="Imagen destacada"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Ofertas destacadas */}
      <section className="bg-ghost-white p-6 h-[40vh]">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Ofertas destacadas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ofertas.map((item, index) => (
            <div
              key={index}
              className="bg-silver rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center"
            >
              <div className="w-full h-44 bg-white rounded mb-2 flex items-center justify-center">
                <span className="text-raisin-black text-sm">Imagen</span>
              </div>
              <p className="font-medium text-raisin-black text-sm truncate">
                {item.name}
              </p>
              <p className="text-non-photo-blue text-sm font-bold">
                ${item.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dos bloques adicionales debajo, sin separación */}
      <section className="flex w-full h-[50vh]">
        {/* Bloque izquierdo - Computación */}
        <div className="w-1/2 bg-raisin-black text-ghost-white p-6 flex flex-col justify-between">
          <h3 className="text-xl font-bold">Computación</h3>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm opacity-70">Contenido o imagen futura</p>
          </div>
        </div>

        {/* Bloque derecho - Electrodomésticos */}
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
