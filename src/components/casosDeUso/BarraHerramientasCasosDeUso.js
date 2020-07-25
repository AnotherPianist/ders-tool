import React, { Component } from "react";
import Box from "@material-ui/core/Box";

import Botonera from "./Botonera";
import ListaRequisitos from "./ListaRequisitos";

/* Este componente es una barra lateral a la izquierda del canvas que contiene el conjunto de botones
y el listado de requisitos que se pueden agregar al canvas como casos de uso. 
*/
class BarraHerramientasCasosDeUso extends Component {
  render() {
    return (
      <Box p={2}>
        <Box mx="auto" p={1.5} pt={0}>
          REQUISITOS FUNCIONALES
        </Box>
        <ListaRequisitos requisitos={this.props.requistos} />
        <Botonera />
      </Box>
    );
  }
}

export default BarraHerramientasCasosDeUso;
