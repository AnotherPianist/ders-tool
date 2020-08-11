import React from "react";
import { Accordion, Container } from "@material-ui/core";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import TablaAnalisisRepago from "./TablaAnalisisRepago";

const AnalisisRepago = (props) => {

  return(
    <>
      <Typography variant="h2" style={{margin: "3rem"}}>Análisis de Repago</Typography>
      <Container>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h5">Información</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              variant="outlined"
            />
          </AccordionDetails>
        </Accordion>
      </Container>
      <TablaAnalisisRepago 
        tablaAnalisisRepago={props.tablaAnalisisRepago} 
        actualizar={props.actualizar}
      />
    </>
  );
}

export default AnalisisRepago;
