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
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #484850",
        },
        margin: "0 26%"
    },
    register_heading: {
        float: "left",
        fontWeight: "bold",
        padding: "10px 0",
        fontSize: "5vh"
    },
    input_field: {
        width: "100%"
    },
    radio_button: {
        flexDirection:"row"
    },
    register_button: {
        margin: "3vh 0",
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
    },


    //Media Query
    '@media (min-width:320px) and (max-width:550px)': { 
        register_social: {
            marginTop: "25%"
        },
        register_paper: {
            width: "85%",
            margin: "0 8%"
        },
        hor_rule: {
            width: "80%"
        },
    },
    '@media (min-width:550px) and (max-width:750px)': { 
        register_social: {
            marginTop: "20%"
        },
        register_paper: {
            width: "80%",
            margin: "0 10%"
        },
        hor_rule: {
            width: "80%"
        },
        register_heading: {
            fontSize: "5vh"
        }     
    },
    '@media (min-width:750px) and (max-width:950px)': { 
        register_social: {
            marginTop: "15%"
        },
        register_paper: {
            width: "70%",
            margin: "0 15%"
        },
        hor_rule: {
            width: "80%"
        },
        register_heading: {
            fontSize: "6vh"
        }     
    },
}))
export default useStyles