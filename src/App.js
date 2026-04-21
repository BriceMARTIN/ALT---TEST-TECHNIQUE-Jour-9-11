import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/tools" element={<></>} />
        <Route path="/analytics" element={<></>} />
        <Route path="/settings" element={<></>} />
      </Routes>
    </Router>
  );
}

export default App;
