// import logo from './logo.svg';
import './App.css';
import Footer from './customer/components/Footer/Footer';
import Navbar from './customer/components/Navigation/Navbar';
import HomePage from './customer/pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
        <div>
          <HomePage/>
        </div>
        <Footer></Footer>
    </div>
  );
}

export default App;
