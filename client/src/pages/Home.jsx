export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to TripMate 🌍
      </h1>

      <p className="mt-4 text-gray-600 text-lg">
        Discover trips • Share budgets • Travel together
      </p>

      <div className="mt-8 flex justify-center gap-6">
        <a
          href="/add"
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
        >
          Add Trip
        </a>

        <a
          href="/explore"
          className="bg-gray-200 px-6 py-3 rounded shadow hover:bg-gray-300"
        >
          Explore Trips
        </a>
      </div>
    </div>
  );
}
