

export const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-black text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Plantronics BackBeat Pro</h1>
        <p className="text-lg mb-6">
          Sonido profesional para amantes de la música
        </p>
        <button className="bg-green-500 px-6 py-2 rounded-full font-semibold hover:bg-green-600">
          Ver producto
        </button>
      </section>

      {/* Popular Section */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Populares</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Placeholder cards */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center"
            >
              <div className="w-32 h-32 bg-gray-200 rounded mb-4"></div>
              <h3 className="text-sm font-semibold text-center mb-1">
                Nombre del producto
              </h3>
              <p className="text-gray-500 text-xs">Precio</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
