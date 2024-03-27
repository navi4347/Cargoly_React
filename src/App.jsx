import Auth from './Components/Auth/Auth';
import Menu from './Components/Menu'
import NotFound from "./Components/NotFound";
import Sales from './Pages/User/Sales'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
  return (
    <Router>
    <Routes>   
      <Route path="/" element={<Auth />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/Sales" element={<Sales />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App