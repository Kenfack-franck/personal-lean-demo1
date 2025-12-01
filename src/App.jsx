import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home'; // C'est le Wizard (Questionnaire)
import Dashboard from './pages/Dashboard';
import StudyRoom from './pages/StudyRoom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/setup" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/study" element={<StudyRoom />} />
    </Routes>
  );
}

export default App;