import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Customer Communication System</h1>
      <p>React application is running successfully.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;