import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    hor_rule: {
        marginTop: "8%"
    },
    allproducts_paper: {
        padding: "1vh 0",
        width: "70%",
    },
    allproducts_link: {
        textDecoration: "none",
        color: "black",
    },
    categories_root: {
        width: "70%",
        margin: "10%"
    },
    colors_root: {
        width: "70%"
    },
    grid1:{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "3%"
    },
    list_button:{
        width: "100%"
    },
    sort_root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    sort_btn_color: {
        color: "blue"
    },
    card_container: {
        paddingTop: "3%"
    },
    pagination_root: {
        display: "flex",
        justifyContent: "center",
        '& > *': {
            marginTop: theme.spacing(6),
        },
    }
}))
export default useStyles