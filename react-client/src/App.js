import React from 'react';
//React Router Dom
import {Routes,Route, BrowserRouter} from 'react-router-dom'

//React-bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import RegisterForm from './components/Register/RegisterForm/RegisterForm'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProductsPage from './components/ProductsPage/ProductsPage';
import ProductDetailsPage from './components/ProductDetailspage/ProductDetailsPage';
import './components/GeneralComponents/GoBackButton.css'
import LoginForm from './components/Login/LoginForm/LoginForm';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/product-list" element={<ProductsPage/>} />
          <Route path="/product-list/:id" element={<ProductDetailsPage/>}/>
          <Route path="/login" element ={<LoginForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  </React.Fragment>
  );
}
export default App;
