import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    footer_grid: {
        textAlign: "center",
    },
    footer_container: {
        marginTop: "10%",
        backgroundColor: "black",
        color: "white",
    },
    footer_textfield: {
        backgroundColor: "white",
        borderRadius: "2px"
    },
    footer_button: {
        backgroundColor: "white",
        textTransform: "none"
    },
    footer_links: {
        textDecoration: "none",
        color: "white"
    },
    footer_heading: {
        fontWeight: "bold"
    },

    //Media Query 
    ['@media (min-width:320px) and (max-width:550px)']: { 
        footer_heading: {
            fontSize: "3vh"
        },
        about_text: {
            fontSize: "2.5vh"
        },
        information_text: {
            fontSize: "2.5vh"
        },
        newsletter_text: {
            fontSize: "2.5vh"
        },
        credit_text: {
            fontSize: "2.5vh"
        },

    },
}))
export default useStyles