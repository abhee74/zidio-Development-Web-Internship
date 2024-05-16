import React, { useState, useEffect } from "react";
import axios from "axios";

function ShowQuery() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/queryform")
      .then((response) => {
        setQueries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching queries:", error);
      });
  }, []);

  // Function to export query data to CSV format
  const exportToCSV = () => {
    // Prepare CSV data
    const csvData = [
      Object.keys(queries[0]).join(","),
      ...queries.map((item) =>
        Object.values(item)
          .map((value) => (typeof value === "string" ? `"${value}"` : value))
          .join(",")
      ),
    ].join("\n");

    // Create a Blob containing the CSV data
    const blob = new Blob([csvData], { type: "text/csv" });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "query_data.csv");

    // Simulate a click on the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up by revoking the URL and removing the link element
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <h2 className="display-5 fw-bold pb-2 mt-5 border-bottom text-center col">
          Query Form Results
        </h2>
        <div className="ml-auto">
          {/* Button to trigger exportToCSV function */}
          <button
            type="button"
            className="btn btn-primary "
            style={{ height: "50px" }}
            onClick={exportToCSV}
          >
            Export
          </button>
        </div>
      </div>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Country Code</th>
            <th>Phone Number</th>
            <th>Query</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query, index) => (
            <tr key={query._id}>
              <td>{index + 1}</td>
              <td>{query.name}</td>
              <td>{query.email}</td>
              <td>{query.countryCode}</td>
              <td>{query.phone}</td>
              <td>{query.query}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ShowQuery;
