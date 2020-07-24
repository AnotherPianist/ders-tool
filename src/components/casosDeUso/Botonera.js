import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";

/* Este componente contiene los botones de las flechas, líneas y actor 
que se pueden dibujar en el canvas
 */
class Botonera extends Component {
  render() {
    return (
      <Box p={5} mx="auto">
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical primary button group"
        >
          <Button>Actor</Button>
          <Button>Asociación</Button>
          <Button>Extends</Button>
          <Button>Include</Button>
        </ButtonGroup>
      </Box>
    );
  }
}

export default Botonera;
