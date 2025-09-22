import React from "react";

function ResultCard({ title, data }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "15px",
      marginBottom: "15px",
      borderRadius: "8px",
      maxWidth: "600px"
    }}>
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>
      <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default ResultCard;
