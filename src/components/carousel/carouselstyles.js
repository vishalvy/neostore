import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "450px",
        marginTop: "10%",
        ['@media (min-width:320px) and (max-width:550px)']: { 
            marginTop: "25%",
            height: "350px"
        },
        ['@media (min-width:550px) and (max-width:750px)']: { 
            marginTop: "20%",
            height: "400px"
        },
        ['@media (min-width:750px) and (max-width:950px)']: { 
            marginTop: "15%",
            height: "450px"
        }
    },
    carousel_img: {
        backgroundPosition: "fixed"
    }
}));
export default useStyles