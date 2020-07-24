import React, { Component } from "react";
import Botonera from "./Botonera";
import ListaRequisitos from "./ListaRequisitos";

class BarraHerramientasCasosDeUso extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>BarraHerramientasCasosDeUso</h1>
        <Botonera />
        <ListaRequisitos />
      </React.Fragment>
    );
  }
}

export default BarraHerramientasCasosDeUso;
