import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setUser(null);

    try {
      const token = localStorage.getItem("topsel_token");

    if (!token) {
        toast.error("Unauthorized! Please log in.");
        return;
      }
      const { data } = await axios.get(`/api/auth/search?username=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(data.user);
    } catch (err) {
      setError(err.response?.data?.message || "User no found");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6  rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Search User</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 rounded border border-gray-600"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {user && (
        <div className="mt-6 p-4 rounded">
          <h3 className="text-lg font-semibold">{user.fullName}</h3>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <p><strong>Country:</strong> {user.country}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
