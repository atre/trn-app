import { Routes, Route } from 'react-router-dom';
import RootPage from './pages/RootPage';
import PlayPage from './pages/PlayPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/play" element={<PlayPage />} />
      </Routes>
    </div>
  );
}

export default App;
