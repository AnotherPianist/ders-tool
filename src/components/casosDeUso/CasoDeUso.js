import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import BarraHerramientaCasosDeUso from "./BarraHerramientasCasosDeUso";
import Canvas from "./Canvas";

/*
Este componente es la pantalla de casos de uso.
Renderiza el canvas y la barra lateral de herramientas en la pantalla de casos de uso
*/
class CasoDeUso extends Component {
  render() {
    return (
      <Grid container>
        <Grid p={2} item xs={6}>
          <BarraHerramientaCasosDeUso></BarraHerramientaCasosDeUso>
        </Grid>
        <Grid item xs={18}>
          <Canvas></Canvas>
        </Grid>
      </Grid>
    );
  }
}
export default CasoDeUso;
