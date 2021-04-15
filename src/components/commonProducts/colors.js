import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Menu, MenuItem, Paper, Typography } from '@material-ui/core';
import React,{useState} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fade from '@material-ui/core/Fade';
import useStyles from './styles'

function Colors() {
    const classes = useStyles()
    const [anchorE1, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
   
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Accordion className={classes.colors_root}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                >
                <Typography className={classes.heading}>Colors</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Button className={classes.list_button}>
                        Brown
                    </Button>
                </AccordionDetails>
                <AccordionDetails>
                    <Button className={classes.list_button}>
                        Blue
                    </Button>
                </AccordionDetails>
                <AccordionDetails>
                    <Button className={classes.list_button}>
                        Black
                    </Button>
                </AccordionDetails>
                <AccordionDetails>
                    <Button className={classes.list_button}>
                        White
                    </Button>
                </AccordionDetails>
            </Accordion>
            
        </>
    )
}

export default Colors
