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
    order_root: {
        border: "solid 1px black",
        borderRadius: "5px",
        // display: "flex",
        // justifyContent: "center",
        padding: "1%"
    },
    order_link: {
        display: "flex",
        justifyContent: "center",
        color: "black",
        '&:hover': {
            textDecoration: "none"
        }
        
    },
    profile_link: {
        display: "flex",
        justifyContent: "center",
        padding: "1%"
    },
    address_link: {
        display: "flex",
        justifyContent: "center",
        padding: "1%"
    }
}))
export default useStyles