import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

export default function ApiData() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10; // posts per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setData(result);
        setFiltered(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  // Search filter
  useEffect(() => {
    const filteredData = data.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
  }, [search, data]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        API Data Viewer
      </h1>

      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 px-3 py-2 border rounded shadow-sm"
        />
      </div>

      {/* Loading and error handling */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {/* Data display */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((post) => (
            <Card key={post.id} title={post.title}>
              <p className="text-gray-700 text-sm">{post.body}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          variant="secondary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="px-3 py-1 bg-gray-200 rounded">
          Page {page}
        </span>
        <Button variant="primary" onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
