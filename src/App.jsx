import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { Login } from './components/Login';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import './App.scss';

function App() {

  return (
    <div className="app">
      <Header />
        
      <div className="container">
        <Routes>
          <Route path="/fake-store" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
