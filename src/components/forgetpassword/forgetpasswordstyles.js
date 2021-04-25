import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({

    hor_rule: {
        opacity: "0.5",
        width: "90%",
        // marginBottom: "5%"
    },
    code_sent_message: {
        color:"red",
        fontSize: "17px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: "5%"
    },
    recover_paper: {
        width: "45%",
    },
    recover_root: {
        marginTop: "10%",
        display: "flex",
        justifyContent: "center",
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #484850",
        },
    },
    recover_heading: {
        marginTop: "5%",
        fontWeight: "bold",
    },
    input_field: {
        width: "100%"
    },
    recover_button: {
        margin: "5vh 0",
        textTransform: "none"
    },
    password_helper: {
        float: "right",
        color: "grey"
    },
    error_tag: {
        float: "left",
        color: "red"
    },
    getcode_btn: {
        display: "flex",
        marginTop: "2%"
    }
}))
export default useStyles