import React from 'react';
//React Router Dom
import {Routes,Route, BrowserRouter} from 'react-router-dom'

//Components
import Register from './components/Register/Register'
import NotFound from './components/NotFound'
import Home from './components/Home'

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  </React.Fragment>
  );
}
export default App;
