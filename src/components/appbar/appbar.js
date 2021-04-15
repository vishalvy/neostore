import React,{useState} from 'react';
import useStyles from './appbarstyles'
import {useHistory} from 'react-router-dom'
import {
    AppBar,Toolbar,Typography,
    Button,TextField,InputAdornment
    ,Menu,MenuItem,Badge,useMediaQuery,useTheme
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DrawerComponent from './drawer'



export default function Layout() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    history.push('/login')
    setAnchorEl(null);
  };
  const handleRegister = () => {
    history.push('/register')
    setAnchorEl(null);
  };

  //Mediaquery
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

  return (
      <AppBar elevation={2} className={classes.appbar}>
        <Toolbar>
          <Typography 
            className={classes.nav_logo}
            onClick={() => history.push('/')}
          >
            Neo
            <span className={classes.logo_store}>
              STORE
            </span>
          </Typography>

        {isMatch ? <DrawerComponent/> : (
            <>
                <div className={classes.nav_items}>
                    <Button color="inherit"
                      onClick={()=> history.push("/")}
                    >
                      Home
                    </Button>
                    <Button color="inherit"
                      onClick={()=> history.push("/allproducts")}
                    >
                      Products</Button>
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
                    onClick={() => history.push("/getcartdata")}
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
                    <MenuItem onClick={handleLogin}>Login</MenuItem>
                    <MenuItem onClick={handleRegister}>Register</MenuItem>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Menu>
            </>
        )}
          
          {/* </div> */}

        </Toolbar>
      </AppBar>
      
  );
}
