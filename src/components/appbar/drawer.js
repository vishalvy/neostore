import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemIcon,
    IconButton,
    ListItemText,
    makeStyles,
    Drawer,
    TextField,
    InputAdornment,
    Badge,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StoreIcon from '@material-ui/icons/Store';
import { connect } from 'react-redux'
import {logoutUser} from '../Redux/actions/actions'


const DrawerComponent = (props) => {
    
    // Css Styling
    const useStyles = makeStyles((theme) => ({
        drawerContainer: {
            width: "30%",
        },
        iconButtonContainer: {
            marginLeft: "auto",
            color: "white",
        },

        menuIconToggle: {
            fontSize: "3rem",
        },
        drawer_textfield: {
            backgroundColor: "white",
            borderRadius: "5px",
            marginLeft: "15%",
        },
        list_item: {
            verticalAlign: "middle",
            display: "inline-flex",
        },
        align_icon: {
            display: "flex",
            alignItems: "center",
        }
    }));

    const [openDrawer, setOpenDrawer] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    
    return (
        <>
            <Drawer
                anchor="right"
                classes={{ paper: classes.drawerContainer }}
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                onOpen={() => setOpenDrawer(true)}
            >
                <List>
                    {props.isLogin &&
                    <ListItem
                        divider
                        button
                        onClick={() => {
                            history.push("/profile");
                            setOpenDrawer(false);
                        }}
                    >
                        <ListItemIcon>
                            <ListItemText className={classes.list_item}>
                                <div className={classes.align_icon}>
                                    <AccountCircleIcon/>My Account 
                                </div>
                            </ListItemText>
                        </ListItemIcon>
                    </ListItem>
                  }
            
                    <ListItem
                        divider
                        button
                        onClick={() => {
                            history.push("/");
                            setOpenDrawer(false);
                        }}
                    >
                        <ListItemIcon>
                            <ListItemText>
                                <div className={classes.align_icon}>
                                    <HomeIcon /> Home 
                                </div>   
                            </ListItemText>
                        </ListItemIcon>
                    </ListItem>

                    <ListItem
                        divider
                        button
                        onClick={() => {
                            history.push("/allproducts");
                            setOpenDrawer(false);
                        }}
                    >
                        <ListItemIcon>
                            <ListItemText>
                                <div className={classes.align_icon}>
                                    <StoreIcon /> Products 
                                </div>
                            </ListItemText>
                        </ListItemIcon>
                    </ListItem>
                    
                    { props.isLogin &&
                    <ListItem
                        divider
                        button
                        onClick={() => {
                            setOpenDrawer(false);
                            history.push("/profile");
                        }}
                    >
                        <ListItemIcon>
                            <ListItemText>
                                <div className={classes.align_icon}>
                                    <LocalMallIcon/>Orders
                                </div> 
                            </ListItemText>
                        </ListItemIcon>
                    </ListItem>
                    }
            
                    <ListItem
                        divider
                        button
                        onClick={() => {
                            setOpenDrawer(false);
                            history.push("/cart");
                        }}
                    >
                        <ListItemIcon>
                            <ListItemText>
                                <Badge badgeContent={props.cartValue} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                                {" "}
                                Cart
                            </ListItemText>
                        </ListItemIcon>
                    </ListItem>

                    { !props.isLogin &&
                    <ListItem
                        divider
                        button
                        onClick={() => {
                            history.push("/login");
                            setOpenDrawer(false);
                        }}
                    >
                        <ListItemIcon>
                            <ListItemText>Login</ListItemText>
                        </ListItemIcon>
                    </ListItem>
                    }

                    {! props.isLogin &&
                      <ListItem
                        divider
                        button
                        onClick={() => {
                          history.push("/register");
                          setOpenDrawer(false);
                        }}
                      >
                        <ListItemIcon>
                          <ListItemText>Register</ListItemText>
                        </ListItemIcon>
                      </ListItem>
                    }
            
                    {props.isLogin &&
                      <ListItem
                        divider
                        button
                        onClick={() => {
                          localStorage.removeItem("userdata");
                            history.push("/login");
                            props.logoutUser()
                          setOpenDrawer(false);
                        }}
                      >
                        <ListItemIcon>
                            <ListItemText>
                                <div className={classes.align_icon}>
                                    <ExitToAppIcon />Logout
                                </div>
                            </ListItemText>
                        </ListItemIcon>
                      </ListItem>
                    }
                </List>
            </Drawer>
            {/* Since this is inside our toolbar we can push it to the end of the toolbar */}
            <TextField
                className={classes.drawer_textfield}
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
            <IconButton
                className={classes.iconButtonContainer}
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple
            >
                <MenuIcon className={classes.menuIconToggle} />
            </IconButton>
        </>
    );
};

const mapStateToProps = (state) => ({
    isLogin: state.perReducer.isLogin,
    cartValue: state.CartPerReducer.cartValue
})
const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => {
        dispatch(logoutUser())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);
