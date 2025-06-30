import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const [heroProduct, setHeroProduct] = useState(null);
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const loadHeroAndOffers = async () => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());

      let chosenHero = null;
      const usedIds = new Set();

      // Buscar una imagen ancha para heroProduct
      for (const product of shuffled) {
        const img = new Image();
        img.src = product.image;

        await new Promise((resolve) => {
          img.onload = () => {
            if (
              img.width > img.height &&
              img.width >= 650 &&
              !usedIds.has(product.id_product)
            ) {
              chosenHero = product;
              usedIds.add(product.id_product);
            }

            resolve();
          };
          img.onerror = resolve;
        });

        if (chosenHero) break;
      }

      // Espera de 400ms para simular carga
      await new Promise((resolve) => setTimeout(resolve, 100));

      setHeroProduct(chosenHero);

      // Obtener 6 productos únicos distintos del heroProduct
      const ofertasFiltradas = shuffled.filter(
        (p) => !usedIds.has(p.id_product)
      );

      const finalOfertas = ofertasFiltradas.slice(0, 6);
      finalOfertas.forEach((p) => usedIds.add(p.id_product));

      setOfertas(finalOfertas);
    };

    if (products.length > 0) loadHeroAndOffers();
  }, [products]);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyInCart = existingCart.find(
      (item) => item.id_product === product.id_product
    );

    if (alreadyInCart) {
      alert("⚠️ Este producto ya está en el carrito.");
    } else {
      const updatedCart = [...existingCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert("✅ Producto añadido al carrito");
    }
  };

  // Filtrar productos por categoría
  const tecnologia = products
    .filter((p) => p.category?.toLowerCase() === "tecnologia")
    .slice(0, 2);

  const electro = products
    .filter((p) => p.category?.toLowerCase() === "electrodomestico")
    .slice(0, 2);

  return (
    <main className="text-raisin-black flex flex-col">
      {/* Imagen destacada */}
      <div className="h-[50vh] w-full">
        {heroProduct ? (
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className="object-contain h-full mx-auto"
          />
        ) : (
          <div className="w-full h-full bg-silver flex items-center justify-center">
            <p className="text-french-gray">Cargando imagen destacada...</p>
          </div>
        )}
      </div>

      {/* Contenedor ghost-white */}
      <div className="bg-ghost-white flex flex-col">
        {/* Ofertas destacadas */}
        <section className="p-6">
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
                  <p className="font-medium text-raisin-black text-sm truncate max-w-[120px]">
                    {item.name}
                  </p>
                  <p className="text-raisin-black text-sm font-bold">
                    ${parseInt(item.price).toLocaleString("es-CL")}
                  </p>
                  <button
                    className="mt-2 bg-raisin-black text-ghost-white text-xs px-3 py-1 rounded hover:bg-french-gray hover:text-raisin-black transition"
                    onClick={() => handleAddToCart(item)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-french-gray col-span-6">
                Cargando productos...
              </p>
            )}
          </div>
        </section>

        <section className="flex w-full h-[60vh] gap-0">
          {/* Tecnología */}
          <div className="w-1/2 bg-raisin-black text-ghost-white p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-4">Tecnología</h3>
            <div className="flex gap-6 h-full w-full overflow-hidden">
              {tecnologia.map((item) => (
                <div
                  key={item.id_product}
                  className="bg-ghost-white text-raisin-black rounded-lg p-4 flex-1 flex flex-col items-center justify-between max-h-[95%]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[90%] h-[55%] object-contain"
                  />
                  <p className="font-medium text-center text-base mt-4 w-[90%] truncate">
                    {item.name}
                  </p>
                  <p className="text-lg font-bold mt-2 w-[90%] text-center">
                    ${parseInt(item.price).toLocaleString("es-CL")}
                  </p>
                  <button
                    className="mt-4 w-[90%] bg-raisin-black text-white text-sm py-2 rounded hover:bg-french-gray hover:text-raisin-black transition"
                    onClick={() => handleAddToCart(item)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Electrodomésticos */}
          <div className="w-1/2 bg-french-gray text-raisin-black p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-4">Electrodomésticos</h3>
            <div className="flex gap-6 h-full w-full overflow-hidden">
              {electro.map((item) => (
                <div
                  key={item.id_product}
                  className="bg-white text-raisin-black rounded-lg p-4 flex-1 flex flex-col items-center justify-between max-h-[95%]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[90%] h-[55%] object-contain"
                  />
                  <p className="font-medium text-center text-base mt-4 w-[90%] truncate">
                    {item.name}
                  </p>
                  <p className="text-lg font-bold mt-2 w-[90%] text-center">
                    ${parseInt(item.price).toLocaleString("es-CL")}
                  </p>
                  <button
                    className="mt-4 w-[90%] bg-raisin-black text-white text-sm py-2 rounded hover:bg-french-gray hover:text-raisin-black transition"
                    onClick={() => handleAddToCart(item)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
