import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuery: '',
  queryHistory: [],
  isLoading: false,
  error: null,
  results: null,
  processingStep: null,
  suggestions: [
    'Show me monthly revenue trends',
    'Compare sales by region',
    'What is our customer growth rate?',
    'Display product category distribution',
  ]
}; 

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
    addToHistory: (state, action) => {
      state.queryHistory.unshift(action.payload);
      if (state.queryHistory.length > 10) {
        state.queryHistory.pop();
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setProcessingSteps: (state, action) => {
      state.processingStep = action.payload;
    }
  }
});

export const {
  setCurrentQuery,
  addToHistory,
  setLoading,
  setError,
  setResults,
  setProcessingSteps
} = querySlice.actions;

export default querySlice.reducer;
