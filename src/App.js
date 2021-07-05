import React from 'react';
import MainHeader from './MainHeader';
import Header1 from './Header1';
import Dashboard from './pages/Dashboard';
import ProductDetail from './ProductDetail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Order from './Order';
import LogIn from './LogIn';
import SignUp from './SignUp';
import MainFooter from './MainFooter';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <MainHeader />
            <Dashboard />
          </Route>
          <Route path="/products/:id">
            <MainHeader />
            <ProductDetail />
          </Route>
          <Route path="/checkout">
            <MainHeader />
            <Checkout />
          </Route>
          <Route path="/orders">
            <MainHeader />
            <Order />
          </Route>
          <Route path="/login">
            <div className="userIn f fdc aic jcsb">
              <Header1 />
              <LogIn />
              <MainFooter />
            </div>
          </Route>
          <Route path="/signup">
            <div className="userIn f fdc aic jcsb">
              <Header1 />
              <SignUp />
              <MainFooter />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
