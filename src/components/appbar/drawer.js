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
import { connect } from 'react-redux'
import {logoutUser} from '../Redux/actions/actions'


const DrawerComponent = (props) => {
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
                                {" "}
                                My Account
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
                            <ListItemText> Home </ListItemText>
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
                            <ListItemText> Products </ListItemText>
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
                            <ListItemText>Orders</ListItemText>
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
                                Cart
                                <Badge badgeContent={props.cartValue} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
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
                          <ListItemText>Logout</ListItemText>
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
