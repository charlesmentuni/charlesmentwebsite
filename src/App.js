import logo from './logo.svg';
import './App.css';
import { Navbar } from "./components/Navbar";
import {Route, Routes} from 'react-router-dom';
import {Home} from './pages/home';
import {About} from './pages/about';

function App() {
  return (
    <>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>

    </>
    );
}

export default App;
