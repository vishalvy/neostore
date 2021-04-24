import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from "@material-ui/core";
import React,{useState} from "react";
import useStyles from "./styles";
import Box from "@material-ui/core/Box";
import validateProfile from './validateProfile'

function Profile() {
    const classes = useStyles();
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const [openForm, setOpenForm] = useState(false);
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [gender, setGender] = useState("male")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [error,setError] = useState({})
    


    const handleClickOpenForm = () => {
        setOpenForm(true);
    };
    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setError(validateProfile(fname, lname, mobile, email))
        if (Object.keys(error).length === 0) {
            setOpenForm(false);
        }
    }
    return (
        <>
            <Paper>
                <Container>
                    <Typography className={classes.profile_heading}>
                        Profile
                    </Typography>
                    <hr className={classes.hor_rule}></hr>

                    <Grid container>
                        <Grid
                            className={classes.profile_grid1}
                            item xs={1} sm={1} md={1} lg={1}
                        >
                            <Box mb={3}>
                                <Typography>Firstname</Typography>
                            </Box>
                            <Box mb={3}>
                                <Typography>Lastname</Typography>
                            </Box>
                            <Box mb={3}>
                                <Typography>Gender</Typography>
                            </Box>
                            <Box mb={3}>
                                <Typography>Mobile</Typography>
                            </Box>
                            <Box mb={3}>
                                <Typography>Email</Typography>
                            </Box>
                        </Grid>
                        
                        <Grid
                            className={classes.profile_grid2}
                            item xs={7} sm={7} md={7} lg={7}
                        >
                            <Box mb={3}>
                                <Typography>{userdata.firstName}</Typography>
                            </Box>
                            <Box mb={3}>
                                <Typography>{userdata.lastName}</Typography>
                            </Box>
                            <Box mb={3}>
                                <Typography>{userdata.gender}</Typography>
                            </Box>
                            <Box mb={3}>
                                <Typography>{userdata.mobile}</Typography>
                            </Box>
                            <Box mb={3}>
                                <Typography>{userdata.email}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <hr className={classes.hor_rule}></hr>

                    <Button
                        onClick={handleClickOpenForm}
                        className={classes.edit_profile}
                        variant="contained" color="primary">
                        Edit
                    </Button>
                    <br/>
                </Container>
            </Paper>

            <Dialog
                open={openForm}
                onClose={handleCloseForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Firstname"
                        type="text"
                        fullWidth
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                    {error.fname && <small className={classes.error_msg}>{error.fname}</small>}
                    
                    <TextField
                        margin="dense"
                        label="Lastname"
                        type="text"
                        fullWidth
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                    />
                    {error.lname && <small className={classes.error_msg}>{error.lname}</small>}
                    <br/>
                    <RadioGroup
                        className={classes.radio_root}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>

                    <TextField
                        margin="dense"
                        label="Mobile"
                        type="text"
                        fullWidth
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    {error.mobile && <small className={classes.error_msg}>{error.mobile}</small>}
                    
                    <TextField
                        margin="dense"
                        label="Email"
                        type="text"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error.email && <small className={classes.error_msg}>{error.email}</small>}
                    
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleCloseForm}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleFormSubmit}
                        color="primary"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Profile;
