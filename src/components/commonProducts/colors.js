import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@material-ui/core';
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles'

function Colors() {
    const classes = useStyles()
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
