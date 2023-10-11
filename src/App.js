import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from "react";
import './App.css';

const Catalog = lazy(() => import('./components/Catalog/Catalog'));

function App() {
  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}> 
       <Routes>
       <Route path="/" element={<Catalog />} />
       </Routes>
       </Suspense>
    </div>

  );
}

export default App;
