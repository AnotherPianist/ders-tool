import React from "react";
import TablaAnalisisRepago from 'TablaAnalisisRepago';
import { Button, Accordion } from "@material-ui/core";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: "#ffff",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    root2: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
}));



const AnalisisRepago = () => {
    const hola = 'Vista analisi de repago';
    const classes = useStyles();

    return(
        <>
        <h1>
             Tabla de análisis de repago
        </h1>

        <div className={classes.root}>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}> <h3>Información</h3></Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                id="outlined-multiline-static"
                //label="Multiline"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                defaultValue="Ingrese texto..."
                variant="outlined"
                />
            </AccordionDetails>
        </Accordion>
        </div>
         
         <div><TablaAnalisisRepago/></div>
        </>
        
    );
}


export default AnalisisRepago;
  