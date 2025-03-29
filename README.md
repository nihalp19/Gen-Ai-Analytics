📊 NLP Query Dashboard
This project is an interactive data visualization dashboard where users can query insights and receive relevant charts using Redux Toolkit for state management, Recharts for data visualization, and Tailwind CSS for styling.

🚀 Features
✅ Natural Language Query Processing – Users can input queries like "Show me monthly revenue trends" to get relevant charts.
✅ Redux Toolkit State Management – Efficient state handling for queries, loading states, and results.
✅ Recharts for Data Visualization – Displays line charts, bar charts, area charts, and pie charts dynamically.
✅ Tailwind CSS for Styling – Provides a modern and responsive UI.
✅ Processing Simulation – Steps through an NLP-like process before displaying results.

🛠 Tech Stack
React.js – Frontend framework

Redux Toolkit – Global state management

Recharts – Data visualization

Tailwind CSS – Styling framework
 
🏗 Installation & Setup
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-repo/nlp-dashboard.git
cd nlp-dashboard
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Start the Development Server
bash
Copy
Edit
npm run dev
Runs the app at http://localhost:3000 🚀

🔧 Key Functions & State Management
Redux Store (querySlice.js)
currentQuery: Stores the user's query

queryHistory: Keeps track of past queries

isLoading: Controls loading state

results: Stores the chart data response

Simulating NLP Processing (simulateNLPProcessing)
js
Copy
Edit
const simulateNLPProcessing = async (query) => {
  dispatch(setLoading(true));
  dispatch(addToHistory(query));

  for (const step of processingSteps) {
    dispatch(setProcessingSteps(step));
    await new Promise(resolve => setTimeout(resolve, 600));
  }

  const title = suggestionToTitleMap[query] || query;
  const matchedResponse = mockResponses.find(response =>
    response.title.toLowerCase() === title.toLowerCase()
  );

  dispatch(setResults(matchedResponse || { error: "No matching data found" }));
  dispatch(setLoading(false));
  dispatch(setProcessingSteps(null));
};


📊 Charts & Data Visualization
Supported Chart Types
✔ Line Chart – Revenue growth over time
✔ Bar Chart – Sales comparison by region
✔ Area Chart – Customer growth trends
✔ Pie Chart – Product category distribution

Example Chart Component (ChartRenderer.js)
js
Copy
Edit
import { LineChart, BarChart, AreaChart, PieChart } from 'recharts';

const ChartRenderer = ({ data }) => {
  switch (data.type) {
    case 'line': return <LineChart data={data} />;
    case 'bar': return <BarChart data={data} />;
    case 'area': return <AreaChart data={data} />;
    case 'pie': return <PieChart data={data} />;
    default: return <p>No chart available</p>;
  }
};


🎨 Styling with Tailwind CSS
Example Tailwind CSS usage in QueryInput.js:

js
Copy
Edit
<input 
  className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Ask me something..."
/>


🛠 Future Improvements
✅ Improve NLP Query Understanding using an AI-based parser
✅ Add Filters & Customization for charts
✅ Connect to a Backend API for real-time data

