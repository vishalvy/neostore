import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    login_form_heading: {
        paddingTop: "2%",
        fontWeight: "bold",
    },
    form_root: {
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #484850",
        },
    },
    grid_container: {
        display: "flex",
        justifyContent: "center",
        marginTop: "10%",
    },
    login_paper: {
        width: "40%",
    },
    login_button: {
        float: "left",
    },
    facebook_button: {
        backgroundColor: "#3b5998",
        color: "white",
        height: "50px",
        width: "200px",
        borderRadius: "3px",
        border: "none",
        fontWeight: "bold",
        fontSize: "16px",
    },
    google_button: {
        height: "48px",
        width: "200px",
    },
    twitter_button: {
        backgroundColor: "#00acee",
        "&:hover": {
            backgroundColor: "#00acee",
        },
        color: "white",
        height: "50px",
        borderRadius: "3px",
    },
    social_container: {
        display: "flex",
        justifyContent: "center",
    },
    forget_link: {
        float: "right",
        textDecoration: "none",
        // color: "black"
    },
    new_user_container: {
        display: "flex",
        flexDirection: "row",
    },
    new_user_link: {
        textDecoration: "none",
        // color: "black"
    },
    email_field: {
        width: "100%",
    },
    error_tag: {
        color: "red",
        float: "left",
    },
}));
export default useStyles;
