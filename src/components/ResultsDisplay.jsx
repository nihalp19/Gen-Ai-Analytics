import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend
} from 'recharts';
import { Loader2, LineChart as ChartIcon } from 'lucide-react';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#6366f1'];

export default function ResultsDisplay() {
  const { results, isLoading, error, processingStep } = useSelector((state) => state.query);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl h-80 bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          {processingStep && <p className="text-gray-600 animate-pulse">{processingStep}</p>}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="w-full max-w-4xl h-80 bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center justify-center h-full space-y-4 text-gray-500">
          <ChartIcon className="h-16 w-16 opacity-20" />
          <p>Enter a query to see insights</p>
        </div>
      </div>
    );
  }

  const chartData = results.labels.map((label, index) => ({
    name: label,
    [results.dataKey]: results.data[index]
  }));

  const renderChart = () => {
    switch (results.type) {
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip formatter={(value) => `${results.prefix}${value}`} contentStyle={{ background: 'white', border: '1px solid #e5e7eb' }} />
            <Legend />
            <Line type="monotone" dataKey={results.dataKey} stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} activeDot={{ r: 6 }} />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip formatter={(value) => `${results.prefix}${value}`} contentStyle={{ background: 'white', border: '1px solid #e5e7eb' }} />
            <Legend />
            <Bar dataKey={results.dataKey} fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip formatter={(value) => `${results.prefix}${value}`} contentStyle={{ background: 'white', border: '1px solid #e5e7eb' }} />
            <Legend />
            <Area type="monotone" dataKey={results.dataKey} fill="#3b82f6" fillOpacity={0.2} stroke="#3b82f6" />
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData}
              dataKey={results.dataKey}
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => `${entry.name} (${entry[results.dataKey]}${results.prefix})`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}${results.prefix}`} contentStyle={{ background: 'white', border: '1px solid #e5e7eb' }} />
            <Legend />
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{results.title}</h2>
        {results.insight && (
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            {results.insight}
          </div>
        )}
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
