const ProductCarousel = ({ title, items }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex-1">
        <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-silver pb-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="w-40 flex-shrink-0 bg-ghost-white rounded-lg p-3 shadow-sm flex flex-col items-center justify-between"
            >
              <div className="w-full h-24 bg-silver rounded mb-2 flex items-center justify-center">
                <span className="text-raisin-black">Imagen</span>
              </div>
              <p className="font-medium text-raisin-black text-center text-sm">{item.name}</p>
              <p className="text-non-photo-blue text-sm font-bold">${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
