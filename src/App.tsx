import './App.css';
import Menu from './MenuSejm';
import { Routes, Route } from 'react-router-dom';
import Sejm from './Sejm';
import Senat from './Senat';
import Informacje from './Informacje';
import './styles/buttons.css';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="" element={<Sejm />} />
            <Route path="sejm" element={<Sejm />} />
            <Route path="senat" element={<Senat />} />
            <Route path="info" element={<Informacje />} />
        </Routes>
    </div>
  );
}

export default App;
