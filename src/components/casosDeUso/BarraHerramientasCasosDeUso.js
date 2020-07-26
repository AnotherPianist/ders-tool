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
      <Box bgcolor="#f9f6f4">
        <Box mt={2} ml={3} pl={4} mb={1} pt={0}>
          REQUISITOS FUNCIONALES
        </Box>
        <Box ml={3} mr={3}>
          <ListaRequisitos
            requisitos={this.props.requisitos}
            onClickRequisito={this.props.onClickRequisito}
          />
        </Box>
        <Box mt={0.5} ml={2} pl={2} mb={1} pt={0}>
          <Botonera />
        </Box>
      </Box>
    );
  }
}

export default BarraHerramientasCasosDeUso;
