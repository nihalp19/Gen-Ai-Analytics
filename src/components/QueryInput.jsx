import React, { useState } from 'react';
import { Search, Send, Sparkles, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuery, addToHistory, setLoading, setResults, setProcessingSteps } from '../store/querySlice';

const mockResponses = [
  {
    type: 'line',
    title: 'Monthly Revenue Trends',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [45000, 52000, 49000, 60000, 55000, 65000],
    dataKey: 'revenue',
    prefix: '$',
    insight: 'Revenue shows an upward trend with 15% growth since January'
  },
  {
    type: 'bar',
    title: 'Sales by Region',
    labels: ['North', 'South', 'East', 'West', 'Central'],
    data: [1200, 900, 1400, 1100, 800],
    dataKey: 'sales',
    prefix: '',
    insight: 'East region leads in sales performance, followed by North'
  },
  {
    type: 'area',
    title: 'Customer Growth',
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    data: [5000, 7500, 10000, 15000],
    dataKey: 'customers',
    prefix: '',
    insight: 'Customer base has tripled over the past year'
  },
  {
    type: 'pie',
    title: 'Product Category Distribution',
    labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'],
    data: [35, 25, 20, 15, 5],
    dataKey: 'percentage',
    prefix: '%',
    insight: 'Electronics dominates sales with 35% market share'
  }
];

const processingSteps = [
  'Analyzing natural language query...',
  'Identifying key metrics and dimensions...',
  'Retrieving relevant data...',
  'Generating visualization...',
  'Extracting insights...'
];

export default function QueryInput() {
  const dispatch = useDispatch();
  const { suggestions, currentQuery } = useSelector((state) => state.query);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const suggestionToTitleMap = {
    "Show me monthly revenue trends": "Monthly Revenue Trends",
    "Compare sales by region": "Sales by Region",
    "What is our customer growth rate?": "Customer Growth",
    "Display product category distribution": "Product Category Distribution"
  };
  
  const simulateNLPProcessing = async (query) => {
    dispatch(setLoading(true));
    dispatch(addToHistory(query));
  
    for (const step of processingSteps) {
      dispatch(setProcessingSteps(step));
      await new Promise(resolve => setTimeout(resolve, 600));
    }
  
    const title = suggestionToTitleMap[query] || query; // Ensure correct mapping
    const matchedResponse = mockResponses.find(response =>
      response.title.toLowerCase() === title.toLowerCase()
    );
  
    dispatch(setResults(matchedResponse || { error: "No matching data found" }));
    dispatch(setLoading(false));
    dispatch(setProcessingSteps(null));
  };

  const handleQuerySubmit = (query) => {
    if (!query.trim()) return;
    setShowSuggestions(false);
    simulateNLPProcessing(query);
  };

  return (
    <div className="relative w-full max-w-4xl">
      <div className="relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={inputValue}
          className="w-full pl-12 pr-16 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          placeholder="Ask your business question..."
          onChange={(e) => {
            setInputValue(e.target.value);
            dispatch(setCurrentQuery(e.target.value));
            setShowSuggestions(e.target.value.length > 0);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleQuerySubmit(inputValue);
            }
          }}
        />
        {inputValue && (
          <button
            className="absolute right-14 top-3 p-2 text-gray-400 hover:text-gray-600"
            onClick={() => {
              setInputValue('');
              dispatch(setCurrentQuery(''));
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          className="absolute right-2 top-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
          onClick={() => handleQuerySubmit(inputValue)}
        >
          <Sparkles className="h-4 w-4" />
          <span className="sr-only">Ask AI</span>
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => {
                setInputValue(suggestion);
                dispatch(setCurrentQuery(suggestion));
                handleQuerySubmit(suggestion);
              }}
            >
              <Search className="h-4 w-4 text-gray-400" />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

