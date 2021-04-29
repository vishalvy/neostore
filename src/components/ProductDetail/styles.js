import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: "8%"
    },
    image_grid: {
       marginTop: "3%",
       display: "flex",
       flexDirection: "column",
       justifyContent: "center",
       alignItems: "center"
    },
    details_grid:{
        marginTop: "3%",
        textAlign: "left"
    },
    // main_img:{
    //     // height:"80%",
    //     // width: "80%"
    // },
    // // main_paper:{
    // //     height:"60%",
    // //     width: "60%",
    // // },
    small_img_root:{
        marginTop: "8%",
        display: "flex",
        justifyContent: "center"
    },
    small_img:{
        height:"80px",
        width: "80px",
        margin: "0 10%"
    },
    hor_rule: {
        opacity: "0.3",
    },
    price_color: {
        color: "green"
    },
    color_display: {
        width: "30px",
        height: "20px",
        border: "1px black solid"
    },
    share_icon: {
        display: "flex",
        alignItems: "center"
    },
    socialMediaButton: {
        margin: "0 1%"        
    },
    add_cart_btn: {
        color: "white",
        backgroundColor: "#2dcbf7",
        '&:hover': {
            color: "white",
            backgroundColor: "#2dcbf7", 
        }
    },
    rate_product_btn: {
        marginLeft: "2%",
        backgroundColor: "#a16f3d",
        color: "white",
        '&:hover': {
            backgroundColor: "#a16f3d",
            color: "white",
        }
    },
    tab_root:{
        margin: "3% 0"
    },
    tab_details: {
        padding: "2%",
        textAlign: "left"
    },
    color_box: {
        display: "flex",
        alignItems: "center",
    },
    dailog_root: {
        textAlign: "center"
    }
}))
export default useStyles