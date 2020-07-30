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
      <Box mx="auto" textAlign="center">
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical primary button group"
        >
          <Button onClick={this.props.onClickActor}>Actor</Button>
          <Button onClick={this.props.onClickAsocDir}>
            Asociación Dirigida
          </Button>
          <Button onClick={this.props.onClickAsocNoDir}>
            Asociación No Dirigida
          </Button>
          <Button onClick={this.props.onClickGeneralizacion}>
            Generalización
          </Button>
          <Button onClick={this.props.onClickDependencia}>Dependencia</Button>
          <Button onClick={this.props.onClickExtends}>Extends</Button>
          <Button onClick={this.props.onClickInclude}>Include</Button>
          <Button onClick={this.props.onClickSujeto}>Sujeto</Button>
        </ButtonGroup>
      </Box>
    );
  }
}

export default Botonera;
