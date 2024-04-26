
import './App.css';
import Authentication from './pages/Authentication/Authentication';

import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage/HomePage';
import Message from './pages/Message/Message';
function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/*' element={<Homepage/>} />
        <Route path='/message' element={<Message/>} />
        <Route path='/*' element={<Authentication/>} />
      </Routes>
      
    </div>
  );
}

export default App;
