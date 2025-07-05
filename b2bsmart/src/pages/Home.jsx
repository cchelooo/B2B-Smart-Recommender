import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductModal from "../components/ProductModal";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [heroProduct, setHeroProduct] = useState(null);
  const [ofertas, setOfertas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 👈 Nuevo estado
  const [feedbackState, setFeedbackState] = useState(null); // null | "loading" | "success"

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    const loadHeroAndOffers = async () => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      let chosenHero = null;
      const usedIds = new Set();

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

      await new Promise((resolve) => setTimeout(resolve, 200));
      setHeroProduct(chosenHero);

      const ofertasFiltradas = shuffled.filter(
        (p) => !usedIds.has(p.id_product)
      );
      const finalOfertas = ofertasFiltradas.slice(0, 6);
      finalOfertas.forEach((p) => usedIds.add(p.id_product));
      setOfertas(finalOfertas);

      setIsLoading(false); // ✅ Todo listo
    };

    if (products.length > 0) loadHeroAndOffers();
  }, [products]);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyInCart = existingCart.find(
      (item) => item.id_product === product.id_product
    );

    if (alreadyInCart) {
      // No mostramos nada si ya está, o puedes hacer otra animación si quieres
      return;
    }

    const updatedCart = [...existingCart, { ...product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Activar feedback de animación
    setFeedbackState("loading");
    setTimeout(() => {
      setFeedbackState("success");
      setTimeout(() => setFeedbackState(null), 1000); // Ocultar después de 1s
    }, 1000); // Mostrar loading por 1s
  };

  const tecnologia = products
    .filter((p) => p.category?.toLowerCase() === "tecnologia")
    .slice(0, 2);

  const electro = products
    .filter((p) => p.category?.toLowerCase() === "electrodomestico")
    .slice(0, 2);

  return (
    <>
      {/* Overlay de carga */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      )}

      {!isLoading && (
        <main className="text-raisin-black flex flex-col">
          {/* Imagen destacada */}
          <div className="h-[50vh] w-full">
            <img
              src={heroProduct.image}
              alt={heroProduct.name}
              className="object-contain h-full mx-auto"
            />
          </div>

          {/* Contenido principal */}
          <div className="bg-ghost-white flex flex-col">
            {/* Ofertas destacadas */}
            <section className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Ofertas destacadas
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {ofertas.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedProduct(item)}
                    className="bg-silver rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition"
                  >
                    <div className="w-full h-44 rounded mb-2 flex items-center justify-center">
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Sección de categorías */}
            <section className="flex w-full h-[60vh] gap-0">
              {/* Tecnología */}
              <div className="w-1/2 bg-raisin-black text-ghost-white p-6 flex flex-col">
                <h3 className="text-xl font-bold mb-4">Tecnología</h3>
                <div className="flex gap-6 h-full w-full overflow-hidden">
                  {tecnologia.map((item) => (
                    <div
                      key={item.id_product}
                      onClick={() => setSelectedProduct(item)}
                      className="bg-ghost-white text-raisin-black rounded-lg p-4 flex-1 flex flex-col items-center justify-between max-h-[95%] cursor-pointer hover:shadow-md transition"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
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
                      onClick={() => setSelectedProduct(item)}
                      className="bg-white text-raisin-black rounded-lg p-4 flex-1 flex flex-col items-center justify-between max-h-[95%] cursor-pointer hover:shadow-md transition"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Modal del producto */}
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={handleAddToCart}
            />
          )}

          {/* Feedback centrado de carga o éxito al añadir al carrito */}
          {feedbackState && (
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
              {feedbackState === "loading" ? (
                <div className="w-14 h-14 border-4 border-non-photo-blue border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <div className="text-green-400 text-[80px] animate-ping-once">
                  ✔
                </div>
              )}
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default Home;
