import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    register_social: {
        marginTop: "10%"
    },
    hor_rule: {
        opacity: "0.5",
        width: "60%"
    },
    register_paper: {
        width: "45%",
    },
    register_root: {
        display: "flex",
        justifyContent: "center",
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #484850",
        },
    },
    register_heading: {
        float: "left",
        fontWeight: "bold",
        padding: "10px 0"
    },
    input_field: {
        width: "100%"
    },
    radio_button: {
        flexDirection:"row"
    },
    register_button: {
        float: "left",
        margin: "5vh 0",
        textTransform: "none"
    },
    max10: {
        float: "left",
        color: "grey"
    },
    counter: {
        float: "right",
        color: "grey"
    },
    password_helper: {
        float: "right",
        color: "grey"
    },
    error_tag: {
        float: "left",
        color: "red"
    }
}))
export default useStyles