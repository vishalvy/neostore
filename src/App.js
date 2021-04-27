import './App.css';
import Dashboard from './components/dashboard';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {Redirect, Route,Switch} from 'react-router-dom' 
import Login from './components/login/login'
import Appbar from './components/appbar/appbar'
import Footer from './components/footer/footer'
import Register from './components/register/register'
import ForgetPassword from './components/forgetpassword/forgerpassword'
import AllProducts from './components/commonProducts/Allproducts'
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import Orderdetail from './components/OrderModule/Myaccount';
import Error from './components/ErrorPage/Error';
import Ordersummary from './components/Cart/Ordersummary';

function App() {
//   const theme = createMuiTheme({
//     typography: {
//      "fontFamily": `"Verdana", "Arial", "Helvetica", sans-serif`,
//      "fontSize": 14,
//      "fontWeightLight": 300,
//      "fontWeightRegular": 400,
//      "fontWeightMedium": 500
//     }
//  });
  return (
    <div className="App">
      {/* <MuiThemeProvider theme={theme}> */}
      <Appbar/>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/recoverpassword' component={ForgetPassword}/>
          <Route exact path='/allproducts' component={AllProducts}/>
          <Route exact path='/product/:id?' component={ProductDetail}/>
          <Route exact path='/cart' component={Cart}/>
          <Route exact path='/profile' component={Orderdetail} />
          <Route exact path='/ordersummary' component={Ordersummary}/>
          <Route exact path='/404' component={Error} />
          <Redirect to="/404" />
        </Switch>
      <Footer/>
      {/* </MuiThemeProvider> */}
    </div>
  );
}

export default App;
