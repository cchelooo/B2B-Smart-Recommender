import React from "react";
import { X } from "lucide-react";

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  // Manejar clics fuera del modal
  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white w-[65vw] h-[80vh] rounded-xl shadow-lg flex overflow-hidden relative">
        {/* Botón X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-raisin-black hover:text-french-gray transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Imagen sin fondo blanco */}
        <div className="w-1/2 flex items-center justify-center p-4 bg-transparent">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="max-w-full max-h-full object-contain rounded"
          />
        </div>

        {/* Detalles */}
        <div className="w-1/2 p-6 flex flex-col justify-between text-raisin-black bg-ghost-white">
          <div>
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-french-gray mb-6">{product.description}</p>
            <p className="text-xl font-bold text-raisin-black mb-2">
              ${parseInt(product.price).toLocaleString("es-CL")}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => onAddToCart(product)}
              className="px-6 py-2 bg-raisin-black text-white rounded hover:bg-french-gray hover:text-raisin-black transition"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
