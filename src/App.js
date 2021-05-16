import {  BrowserRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/index.js';
import Switcher from './components/Switcher/Switcher.jsx';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switcher/>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
