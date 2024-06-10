// import logo from './logo.svg';
import './App.css';
import Navbar from './customer/components/Navigation/Navbar';
import HomePage from './customer/pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
        <div>
          <HomePage/>
        </div>
    </div>
  );
}

export default App;
