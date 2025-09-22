import React, { useState } from "react";

function SearchForm({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter email or phone number"
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button type="submit" style={{ padding: "10px 20px" }}>Search</button>
    </form>
  );
}

export default SearchForm;
