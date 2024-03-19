// App.jsx 
import "./App.css"; 
import LogInForm from "./Login";
import Dashboard from './components/dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import CheckOut from "./components/checkout";
import NoPage from "./components/nopage";
import ProductsView from "./components/products";

function App() { 
return ( 
	<BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInForm />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="products" element={<ProductsView />} />
          <Route path="*" element={<NoPage />} />
        </Route> 
      </Routes>
    </BrowserRouter>
	); 
} 

export default App;
