import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import ResultCard from "./components/ResultCard";
import axios from "axios";
import "./App.css";

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (input) => {
    setLoading(true);
    setError("");
    setResults(null);

    try {
      let endpoint = "";
      if (input.includes("@")) {
        endpoint = `http://localhost:3000/email/${input}`;
      } else {
        endpoint = `http://localhost:3000/phone-lookup/${input}`;
      }

      const res = await axios.get(endpoint);
      setResults(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>OSINT Email & Phone Tracker</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {results && <ResultCard title="Results" data={results} />}
    </div>
  );
}

export default App;
