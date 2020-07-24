import React, { Component } from "react";
import BarraHerramientaCasosDeUso from "./BarraHerramientasCasosDeUso";
import Canvas from "./Canvas";

/*
Este componente es la pantalla de casos de uso.
Renderiza la barra de herramientas de la pantalla de casos de uso y el canvas
*/
class CasoDeUso extends Component {
  render() {
    return (
      <React.Fragment>
        <BarraHerramientaCasosDeUso></BarraHerramientaCasosDeUso>
        <Canvas></Canvas>
      </React.Fragment>
    );
  }
}
export default CasoDeUso;
