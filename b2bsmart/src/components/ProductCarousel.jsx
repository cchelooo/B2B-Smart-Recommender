const ProductCarousel = ({ title, items }) => {
  return (
    <div className="bg-ghost-white rounded-xl shadow p-6 h-full flex flex-col justify-between">
      <h3 className="text-xl font-semibold mb-4 text-center text-raisin-black">
        {title}
      </h3>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-silver w-full">
          {items.map((item, index) => (
            <div
              key={index}
              className="snap-center flex-shrink-0 w-1/4 h-48 bg-silver rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center"
            >
              <div className="w-full h-20 bg-white rounded mb-2 flex items-center justify-center">
                <span className="text-raisin-black text-sm">Imagen</span>
              </div>
              <p className="font-medium text-raisin-black text-sm truncate">
                {item.name}
              </p>
              <p className="text-raisin-black text-sm font-bold">
                ${item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
