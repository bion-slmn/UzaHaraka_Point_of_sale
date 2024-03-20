// App.jsx 
import "./App.css"; 
import LogInForm from "./Login";
import Dashboard from './components/dashboard';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import CheckOut from "./components/checkout";
import NoPage from "./components/nopage";
import ProductsView from "./components/products";

function App() { 
return ( 
      <BrowserRouter>
            
            <Routes>
                  <Route path="/" element={<LogInForm />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/checkout" element={<CheckOut />} />
                  <Route path="/products" element={<ProductsView />} />
                  <Route path="*" element={<NoPage />} />
            </Routes>
      </BrowserRouter>
	); 
} 

export default App;
