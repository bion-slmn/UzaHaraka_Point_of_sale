// App.jsx 
import LogInForm from "./components/auth/Login";
import Dashboard from './components/dashboard';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CheckOut from "./components/checkout";
import NoPage from "./components/nopage";
import ProductsView from "./components/products/products_view";
import ProductCategory from "./components/products/products_category";


function App() {
      return (
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<LogInForm />} />
                        <Route path="/dashboard/*" element={<Dashboard />} />
                        <Route path="/products_category/" element={<ProductCategory />} />
                        <Route path="/checkout" element={<CheckOut />} />
                        <Route path="/products_view" element={<ProductsView />} />
                        <Route path="*" element={<NoPage />} />
                  </Routes>
            </BrowserRouter>
      )
}


export default App;
