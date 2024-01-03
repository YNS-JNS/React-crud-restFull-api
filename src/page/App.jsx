// Importing packages:
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing components:
import Navbar from "../components/layout/Navbar"
import ProductsList from '../components/products/ProductsList'
import AddProduct from "../components/products/AddProduct";
import ProductDeatils from '../components/products/ProductDeatils';
import Sendingcompo from '../components/cloudinary/Sendingcompo';// Testing
import UpdateProduct from '../components/products/UpdateProduct';


const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductDeatils />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/upload-image" element={<Sendingcompo />} />
        </Routes>
      </Router>
    </>
  )
}

export default App