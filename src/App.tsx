import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calculator from './Calculator/Calculator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
