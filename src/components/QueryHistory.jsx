import React from 'react';
import { History } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function QueryHistory() {
  const queryHistory = useSelector((state) => state.query.queryHistory);

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold">Recent Queries</h2>
      </div>
      <div className="space-y-2">
        {queryHistory.map((query, index) => (
          <div
            key={index}
            className="p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {query}
          </div>
        ))}
      </div>
    </div>
  );
}
