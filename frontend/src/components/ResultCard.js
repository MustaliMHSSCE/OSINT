import React from "react";

function ResultCard({ data }) {
  if (!data) return <p>No data available</p>;

  // Determine type
  const isPhone = data.hasOwnProperty("valid") && data.hasOwnProperty("line_type");
  const isEmail = data.data && data.data.hasOwnProperty("email");

  // Phone result
  if (isPhone) {
    const info = data; // phone API returns direct JSON
    return (
      <div className="result-card">
        <h3>Phone Lookup</h3>
        <div className="result-row"><span>Valid:</span> <span>{info.valid.toString()}</span></div>
        <div className="result-row"><span>Country:</span> <span>{info.country_name || info.country}</span></div>
        <div className="result-row"><span>Location:</span> <span>{info.location || "N/A"}</span></div>
        <div className="result-row"><span>Carrier:</span> <span>{info.carrier || "N/A"}</span></div>
        <div className="result-row"><span>Line Type:</span> <span>{info.line_type || "N/A"}</span></div>
      </div>
    );
  }

  // Email result
  if (isEmail) {
    const info = data.data; // Hunter.io wraps inside data
    let mxRecords = "N/A";
    if (info.mx_records) {
      mxRecords = Array.isArray(info.mx_records)
        ? info.mx_records.join(", ")
        : info.mx_records.toString();
    }

    return (
      <div className="result-card">
        <h3>Email Lookup</h3>
        <div className="result-row"><span>Valid:</span> <span>{info.result || "N/A"}</span></div>
        <div className="result-row"><span>Email:</span> <span>{info.email}</span></div>
        <div className="result-row"><span>Score:</span> <span>{info.score || "N/A"}</span></div>
        <div className="result-row"><span>MX Records:</span> <span>{mxRecords}</span></div>
        <div className="result-row"><span>Disposable:</span> <span>{info.disposable ? "Yes" : "No"}</span></div>
      </div>
    );
  }

  return <p>No data available</p>;
}

export default ResultCard;
