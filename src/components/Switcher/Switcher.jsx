import {useState, useEffect} from 'react';
import {Switch, Route, useLocation} from "react-router-dom";
import NavBar from '../Navbar/NavBar';
import Home from '../Home/Home';
import Discover from '../Discover/Discover';
import SearchPage from '../SearchPage/SearchPage';
import Categories from '../Categories/Categories';
import Modal from '../Modal/Modal';
import PhotoPage from '../PhotoPage/PhotoPage';

function Switcher() {

    const [active, setActive] = useState(false);
    let location = useLocation();
    let background = location.state && location.state.background;
   
    return (
      <>
        <NavBar active={active}/>
        <Switch location={background || location}>
            <Route exact path="/" render={() => { setActive(false); return <Home/>}}/>
            <Route path="/photo/:image" render={() => { setActive(false); return <Home/>}}/>
            <Route path="/discover" render={() => { setActive(true); return <Discover/>}}/>
            <Route path="/search/:id" render={() => { setActive(true); return <SearchPage/>}}/>
            <Route path="/categories" render={() => { setActive(true); return <Categories/>}}/>
            <Route path="/collection/" render={() => { setActive(true); return <PhotoPage/>}}/>
            <Route path="/likes/" render={() => { setActive(true); return <PhotoPage/>}}/>
        </Switch>
        {background &&  <Route path="/photo/:image" children={<Modal/>}/>}
      </>
    );
  }
  
  export default Switcher;
  