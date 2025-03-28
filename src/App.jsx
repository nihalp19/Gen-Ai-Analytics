import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import QueryInput from './components/QueryInput';
import QueryHistory from './components/QueryHistory';
import ResultsDisplay from './components/ResultsDisplay';
import { Brain } from 'lucide-react';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-3 text-center">
            <Brain className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Gen AI Analytics</h1>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <QueryInput />
            <ResultsDisplay />
            <QueryHistory />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
