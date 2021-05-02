import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    hor_rule: {
        marginTop: "8%",
    },
    allproducts_paper: {
        padding: "0.5vh 0",
        width: "80%",
    },
    allproducts_link: {
        textTransform: "none",
        color: "black",
        fontSize: "2.7vh"
    },
    categories_root: {
        width: "80%",
        margin: "10%",
    },
    colors_root: {
        width: "80%",
    },
    grid1: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "3%",
    },
    list_button: {
        width: "100%",
    },
    sort_root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    sort_btn_color: {
        color: "blue",
    },
    card_container: {
        paddingTop: "3%",
    },
    pagination_root: {
        display: "flex",
        justifyContent: "center",
        "& > *": {
            marginTop: theme.spacing(6),
        },
    },

    //Media Query
    ['@media (min-width:320px) and (max-width:550px)']: { 
        hor_rule: {
            marginTop: "26%",
        },
        sort_root: {
            paddingLeft: "5%",
            float: "left"
        }
    },
    ['@media (min-width:550px) and (max-width:750px)']: { 
        hor_rule: {
            marginTop: "17%",
        },
        sort_root: {
            paddingLeft: "5%",
            float: "left"
        }
    },
    ['@media (min-width:750px) and (max-width:950px)']: { 
        hor_rule: {
            marginTop: "13%",
        },
        sort_root: {
            paddingRight: "5%",
            // float: "left"
        }
    },
}));
export default useStyles;
