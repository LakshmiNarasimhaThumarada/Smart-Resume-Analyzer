import React, { useEffect, useState } from "react";

const HistoryTable = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Resume Match History</h2>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Resume Name</th>
              <th className="p-2 border">Match Score</th>
              <th className="p-2 border">Matched On</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{item.fileName}</td>
                <td className="p-2 border">{item.matchScore.toFixed(2)}%</td>
                <td className="p-2 border">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryTable;
