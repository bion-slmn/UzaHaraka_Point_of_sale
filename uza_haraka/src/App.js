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
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/products'>Products</Link>
      <Link to='/checkout'>Checkout</Link>
      <Routes>
            <Route path="/" element={<LogInForm />} />
            <Route path="/dashboard/:username" element={<Dashboard />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/products" element={<ProductsView />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>
	); 
} 

export default App;
