import React,{useState} from 'react';
import useStyles from './layoutstyles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge'


export default function Layout() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <AppBar elevation={2} className={classes.appbar}>
        <Toolbar>
          {/* <Typography className={classes.nav_logo}>
            Neo
            <span className={classes.logo_store}>
              STORE
            </span>
          </Typography> */}

          <div className={classes.nav_items}>
            <Button color="inherit" >Home</Button>
            <Button color="inherit">Products</Button>
            <Button color="inherit">Order</Button>
          </div>

          {/* <div className={classes.nav_cart_container}> */}
          
          <TextField 
              className={classes.nav_textfield}
              placeholder="Search.."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon/>
                  </InputAdornment>
                ),
              }}
          />

          <Button 
            variant="contained"
            startIcon={<Badge badgeContent={5} color="secondary">
            <ShoppingCartIcon/>
          </Badge>}
            className={classes.nav_cart_btn} 
          >
            Cart
          </Button> 

          <Button variant="contained" 
            startIcon={<AccountBoxIcon/>}
            onClick={handleClick}
            aria-controls="simple-menu" 
            className={classes.nav_dropdown_btn}
          >
            <KeyboardArrowDownIcon/>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Login</MenuItem>
            <MenuItem onClick={handleClose}>Register</MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Menu>
          {/* </div> */}

        </Toolbar>
      </AppBar>
      
  );
}
