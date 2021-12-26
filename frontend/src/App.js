import './App.css';
import renderRoutes from "./utils/renderRoutes";
import {routes} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
          {renderRoutes(routes)}
      </Router>
    </div>
  );
}

export default App;
