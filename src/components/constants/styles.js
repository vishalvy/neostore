import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    empty_cart: {
        width: "45%",
        marginTop: "8%"
    },

    //Media Query
    '@media (min-width:320px) and (max-width:550px)': { 
        empty_cart: {
            marginTop: "35%",
            width: "85%",
        }
    },
    '@media (min-width:550px) and (max-width:750px)': { 
        empty_cart: {
            marginTop: "25%",
            width: "75%",
        }
    },
    '@media (min-width:750px) and (max-width:950px)': { 
        empty_cart: {
            marginTop: "15%",
            width: "70%",
        }
    },
}))
export default useStyles