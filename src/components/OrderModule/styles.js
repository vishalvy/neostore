import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "8%"
    },
    hor_rule: {
       opacity: "0.3"
    },
    root_heading: {
        display: "flex"
    },
    profile_img: {
        width: "220px",
        height: "200px",
        borderRadius: "50%"
    },
    account_username: {
        color: "brown"
    },
    order_root: {
        display: "flex",
        justifyContent: "center",

    },
    order_btn: {
        display: "flex",
        justifyContent: "center",
        color: "black"
    },
    transit_text: {
        color: "brown",
        paddingRight: "1%"
    },
    price_text: {
        color: "green",
        paddingLeft: "1%"
    },
    order_paper: {
        textAlign: "left",
        margin: "3%"
    },
    no_order_img: {
        marginTop: "5%",
        width: "70%",
    },
    buy_again_btn: {
        float: "right"
    },

    //Order Page Media Query
    ['@media (min-width:320px) and (max-width:550px)']: { 
        root: {
            marginTop: "20%"
        },
        order_paper: {
            marginTop: "5%"
        }
    },
    ['@media (min-width:550px) and (max-width:750px)']: { 
        root: {
            marginTop: "15%"
        },
        order_paper: {
            marginTop: "5%"
        }
    },
    ['@media (min-width:750px) and (max-width:950px)']: {
        root: {
            marginTop: "10%"
        },
        order_paper: {
            marginTop: "5%"
        }
    },


    ///addresss styling
    address_root_paper: {
        textAlign:"left"
    },
    address_paper: {
        margin: "3% 0"
    },
    address_heading: {
        fontSize: "5vh",
        padding: "1%"
    },
    cancel_icon: {
        float: "right"
    },
    address_text: {
        padding: "2% 0"
    },
    add_address_btn: {
        margin: "1% 0",
        textTransform: "none"
    },
    error_msg: {
        color: "red"
    },

    //Profile Page Media Query
    ['@media (min-width:320px) and (max-width:550px)']: { 
        address_root_paper: {
            marginTop: "10%"
        }
    },



    //Profile styling

    profile_heading: {
        fontSize: "5vh",
        padding: "1%",
        display: "flex"
    },
    profile_grid1: {
        textAlign: "left"
    },
    profile_grid2: {
        paddingLeft: "30%",
        textAlign: "left"
    },
    edit_profile: {
        display: "flex",
    },
    radio_root: {
        display: "inline"
    },
    //Profile Page Media Query
    ['@media (min-width:320px) and (max-width:550px)']: { 
        root: {
            marginTop: "25%"
        },
        profile_root: {
            marginTop: "5%"
        }
    },



    //Change Password Styling
    ChangePass_root_paper: {
        marginTop: "4%",
        display: "flex",
        justifyContent: "center",
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #484850",
        },
    },
    recover_heading: {
        marginTop: "2%",
        fontWeight: "bold",
    },
    input_field: {
        width: "70%"
    },
    recover_button: {
        margin: "2% 0",
        textTransform: "none",
    },
}))
export default useStyles