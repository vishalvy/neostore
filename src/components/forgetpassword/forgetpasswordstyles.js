import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({

    hor_rule: {
        opacity: "0.5",
        width: "90%",
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
        marginTop: "10%",
        margin: "0 26%",
        width: "45%",
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #484850",
        },
    },
    recover_heading: {
        paddingTop: "2%",
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
    },


    //Media Query 
    '@media (min-width:320px) and (max-width:550px)': { 
        recover_paper: {
            marginTop: "25%",
            width: "80%",
            margin: "0 10%"
        },
        recover_heading: {
            fontSize: "5.5vh"
        }
    },
    '@media (min-width:550px) and (max-width:750px)': { 
        recover_paper: {
            marginTop: "20%",
            width: "80%",
            margin: "0 10%"
        },
        recover_heading: {
            fontSize: "6vh"
        }
    },
    '@media (min-width:750px) and (max-width:950px)': { 
        recover_paper: {
            marginTop: "15%",
            width: "70%",
            margin: "0 15%"
        },
        recover_heading: {
            fontSize: "6vh"
        }
    },
}))
export default useStyles