import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import ResultCard from "./components/ResultCard";
import axios from "axios";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (input) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Use phone or email route depending on input
      let endpoint = "";
      if (input.includes("@")) {
        endpoint = `http://localhost:3000/email/${input}`;
      } else {
        endpoint = `http://localhost:3000/phone-lookup/${input}`;
      }

      const res = await axios.get(endpoint);
      setResult(res.data); // store actual JSON from backend
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Email & Phone Tracker</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {result && <ResultCard data={result} />}
    </div>
  );
}

export default App;
