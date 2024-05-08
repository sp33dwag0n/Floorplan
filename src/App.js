import './App.css';
import { FloorPlanProvider } from './components/FloorPlanContext';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './Pages/Home';
import Form from './Pages/Form';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <FloorPlanProvider>
        <Routes>
          <Route exact path='/' element={<Form />} />
          <Route exact path='/floorplans' element={<Home />} />
        </Routes>
        </FloorPlanProvider>
      </Router>
    </div>
  );
}

export default App;
