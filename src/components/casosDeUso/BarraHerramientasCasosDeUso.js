import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Botonera from "./Botonera";
import ListaRequisitos from "./ListaRequisitos";

/* Este componente es una barra lateral a la izquierda del canvas que contiene el conjunto de botones
y el listado de requisitos que se pueden agregar al canvas como casos de uso. 
*/
class BarraHerramientasCasosDeUso extends Component {
  render() {
    const center = {
      textAlign: "center",
    };
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography style={center}>REQUISITOS FUNCIONALES</Typography>
        </Grid>

        <Grid item xs={12}>
          <ListaRequisitos
            style={center}
            requisitos={this.props.requisitos}
            onClickRequisito={this.props.onClickRequisito}
          />
        </Grid>

        <Grid item xs={12}>
          <Botonera />
        </Grid>
      </Grid>
    );
  }
}

export default BarraHerramientasCasosDeUso;
