import React, { useEffect, useState } from "react";
import UserNavbar from "../components/navbar/UserNavbar.jsx";
import "../styles/Result.css"; // Import the new Result.css
import axios from "axios";

const Result = () => {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // New state for filtering

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) setUsername(user.name);

    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/results/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const filteredResults = results.filter((result) => {
    if (filterStatus === "all") {
      return true;
    }
    return result.status === filterStatus;
  });

  return (
    <div className="dashboard-container">
      <UserNavbar username={username} onLogout={handleLogout} />
      <main className="dashboard-main">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Test Results</h1>

          <div className="flex space-x-10 mb-6">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                filterStatus === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              All Results
            </button>
            <button
              onClick={() => setFilterStatus("Pending")}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                filterStatus === "Pending"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Pending
            </button>
            <button
              onClick={() => setFilterStatus("Received")}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                filterStatus === "Received"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Received
            </button>
          </div>

          <div className="mt-6">
            {filteredResults.length === 0 ? (
              <div className="empty-results-container">
                <div className="illustration">
                  {/* Placeholder for an SVG or image */}
                  <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9-1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2>No Test Results Found</h2>
                <p>It looks like there are no results for "{filterStatus === "all" ? "all statuses" : filterStatus}".</p>
                <p className="mt-2">Please check back later or adjust your filter criteria.</p>
              </div>
            ) : (
              <div className="results-grid">
                {filteredResults.map((result) => (
                  <div key={result._id} className={`result-card ${result.status === "Received" ? "status-received" : "status-pending"}`}>
                    <div className="result-card-header">
                      <h3 className="result-card-title">{result.fileName}</h3>
                      <span className={`status-badge ${result.status === "Received" ? "received" : "pending"}`}>
                        {result.status === "Received" ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        )}
                        {result.status}
                      </span>
                    </div>
                    <div className="result-card-body">
                      <p className="text-sm text-gray-600">
                        Uploaded on {new Date(result.uploadedAt).toLocaleDateString()}
                      </p>
                      <p className="result-card-summary">
                        {result.status === "Received"
                          ? "Your test results are ready for review and download."
                          : "Your test results are currently being processed. Please check back soon."}
                      </p>
                    </div>
                    <div className="result-card-actions">
                      {result.status === "Received" && (
                        <>
                          <a
                            href={`http://localhost:3001/${result.filePath}`}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-button primary"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download Report
                          </a>
                          <button className="action-button secondary">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M15 8a2 2 0 10-2-2h-3.333a1 1 0 00-.707.293l-2.5 2.5a1 1 0 000 1.414l2.5 2.5a1 1 0 00.707.293H13a2 2 0 100 4h-1a1 1 0 100 2h1a4 4 0 100-8h-3.333l-2.5-2.5 2.5-2.5H13a2 2 0 100-4h-1a1 1 0 100 2h1z" />
                            </svg>
                            Share
                          </button>
                        </>
                      )}
                      {result.status === "Pending" && (
                        <button className="action-button secondary">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 000-2H9z" clipRule="evenodd" />
                          </svg>
                          Contact Support
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;
