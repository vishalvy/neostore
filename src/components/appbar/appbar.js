import React, { useEffect, useState } from "react";
import useStyles from "./appbarstyles";
import { useHistory } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Menu,
    MenuItem,
    Badge,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DrawerComponent from "./drawer";
import axios from "axios";
import { BaseUrl } from "../constants/baseUrl";

export default function Layout() {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [cartCount, setcartCount] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState()

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogin = () => {
        history.push("/login");
        setAnchorEl(null);
    };
    const handleRegister = () => {
        history.push("/register");
        setAnchorEl(null);
    };

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        const isLogin = localStorage.getItem("isLoggedIn");
        // console.log(isLogin);
        setIsLoggedIn(isLogin);
        if (userdata) {
            const token = userdata.token;
            setUsername(userdata.firstName)

            axios
                .get(`${BaseUrl}/api/cart`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((res) => {
                    const temp = res.data.data.products;
                    setcartCount(temp.length);
                });
        }
    }, [cartCount]);

    //Mediaquery
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <AppBar elevation={2} className={classes.appbar}>
            <Toolbar>
                <Typography
                    className={classes.nav_logo}
                    onClick={() => history.push("/")}
                >
                    Neo
                    <span className={classes.logo_store}>STORE</span>
                </Typography>

                {isMatch ? (
                    <DrawerComponent />
                ) : (
                    <>
                        <div className={classes.nav_items}>
                            <Button
                                color="inherit"
                                onClick={() => history.push("/")}
                            >
                                Home
                            </Button>
                            <Button
                                className={classes.nav_product_btn}
                                color="inherit"
                                onClick={() => history.push("/allproducts")}
                            >
                                Products
                            </Button>
                            <Button
                                    onClick={() => {
                                        history.push({
                                            pathname: "/profile",
                                            // order: {true},
                                        }
                                    )}}
                                color="inherit"
                            >
                                    Orders
                            </Button>
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
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            onClick={() => history.push("/cart")}
                            variant="contained"
                            startIcon={
                                <Badge
                                    badgeContent={cartCount}
                                    color="secondary"
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            }
                            className={classes.nav_cart_btn}
                        >
                            Cart
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<AccountBoxIcon />}
                            onClick={handleClick}
                            aria-controls="simple-menu"
                            className={classes.nav_dropdown_btn}
                        >
                            {username}<KeyboardArrowDownIcon />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {isLoggedIn === "false" && (
                                <MenuItem onClick={handleLogin}>Login</MenuItem>
                            )}

                            {isLoggedIn === "false" && (
                                <MenuItem onClick={handleRegister}>
                                    Register
                                </MenuItem>  
                            )}
                            {isLoggedIn  === "true" && (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        history.push("/profile");
                                        handleClose();
                                    }}
                                >
                                    My Account
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        localStorage.removeItem("userdata");
                                        localStorage.setItem('isLoggedIn',false)
                                        handleClose();
                                        history.push("/login");
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </>
                            )}
                        </Menu>
                    </>
                )}

                {/* </div> */}
            </Toolbar>
        </AppBar>
    );
}
