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
    }
}))
export default useStyles