import { Suspense, lazy } from "react";
import {  BrowserRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/index.js';
import Loader from "./components/Loader/Loader.js";
const Switcher = lazy(() => import('./components/Switcher/Switcher.jsx'));

function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <Router>
            <Suspense fallback={<Loader/>}>
              <Switcher/>
            </Suspense>
          </Router>
        </Provider>
      </div>
    
  );
}

export default App;
