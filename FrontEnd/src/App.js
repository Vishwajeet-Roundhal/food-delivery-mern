// import logo from './logo.svg';
import "./App.css";
import Footer from "./customer/components/Footer/Footer";
import Navbar from "./customer/components/Navigation/Navbar";
import HomePage from "./customer/pages/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RestoForm from "./Admin/restaurant/RestoForm";
import { UserProvider } from "./Context/UserContext";
import Register from "./customer/components/Register";
import Dashboard from "./Admin/restaurant/Dashboard";
import Login from "./customer/components/Login";
import SingleRestaurant from "./customer/components/SingleRestaurant";
import MyCart from "./customer/components/MyCart";
import { CartProvider } from "./Context/CartContext";
import Orders from "./customer/components/Orders";
import RestaurantOrders from "./Admin/restaurant/RestaurantOrders";

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/restaurant/:id" element={<SingleRestaurant />} />
                <Route path="/cart" element={<MyCart />} />
                <Route path="/orders" element={<Orders />} />

                <Route path="/registerRestaurant">
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="/registerRestaurant" element={<RestoForm />} />
                  <Route path="orders" element={<RestaurantOrders />} />
                </Route>
              </Routes>
            </div>
            <Footer className="footer" />
          </div>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
