import Login from './Components/Auth/Login';
import Menu from './Components/Menu'
import NotFound from "./Components/NotFound";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
  return (
    <Router>
    <Routes>   
      <Route path="/" element={<Login />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App