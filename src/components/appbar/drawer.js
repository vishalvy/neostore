import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
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
  Badge
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search'
// import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const DrawerComponent = () => {
  const useStyles = makeStyles(theme => ({
    drawerContainer: {
      width: "30%",
    },
    iconButtonContainer: {
      marginLeft: 'auto',
      color: 'white',
    },

    menuIconToggle: {
      fontSize: '3rem',
    },
    drawer_textfield:{
        backgroundColor: "white",
        borderRadius: "5px",
        marginLeft: "15%"
    },
    list_item: {
      verticalAlign: 'middle',
    display: "inline-flex"
    }
  }));

  const [openDrawer, setOpenDrawer] = useState(false);

  //Css
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Drawer
        anchor='right'
        classes={{ paper: classes.drawerContainer }}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}>
        <List>
          <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemIcon>
            {/* <AccountCircleIcon/> */}
              <ListItemText className={classes.list_item}> Profile</ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem divider button onClick={() => {
            history.push('/') 
            setOpenDrawer(false)
          }}>
            <ListItemIcon>
              <ListItemText>  Home  </ListItemText>
            </ListItemIcon>
          </ListItem>

          <ListItem divider button onClick={() => {
            history.push('/allproducts') 
            setOpenDrawer(false)
          }}>
            <ListItemIcon>
              <ListItemText>  Products  </ListItemText>
            </ListItemIcon>
          </ListItem>

          <ListItem divider button onClick={() => {
            setOpenDrawer(false)
            history.push("/getcartdata")
          }}>
            <ListItemIcon>
              <ListItemText>Order</ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemIcon>
              <ListItemText>
                  Cart
                  <Badge badgeContent={5} color="secondary">
                    <ShoppingCartIcon/>
                  </Badge>
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem divider button onClick={() => {
            history.push('/login') 
            setOpenDrawer(false)
          }}>
            <ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem divider button onClick={() => {
            history.push('/register') 
            setOpenDrawer(false)
          }}>
            <ListItemIcon>
              <ListItemText>Register</ListItemText>
            </ListItemIcon>
          </ListItem>
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
                    <SearchIcon/>
                </InputAdornment>
                ),
            }}
        />
      <IconButton
        className={classes.iconButtonContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple>
        <MenuIcon className={classes.menuIconToggle} />
      </IconButton>
    </>
  );
};

export default DrawerComponent;