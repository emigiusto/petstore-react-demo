import React from 'react';
//React Router Dom
import {Routes,Route, BrowserRouter} from 'react-router-dom'

//React-bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import Register from './components/Register/Register'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProductList from './components/ProductList/ProductList';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productList" element={<ProductList/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  </React.Fragment>
  );
}
export default App;
