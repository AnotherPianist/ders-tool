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
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography style={{textAlign: "center"}}>REQUISITOS FUNCIONALES</Typography>
        </Grid>

        <Grid item xs={12}>
          <ListaRequisitos
            style={{textAlign: "center"}}
            requisitos={this.props.requisitos}
            onClickRequisito={this.props.onClickRequisito}
          />
        </Grid>

        <Grid item xs={12}>
          <Botonera
            onClickRequisito={this.props.onClickRequisito}
            onClickActor={this.props.onClickActor}
            onClickAsocDir={this.props.onClickAsocDir}
            onClickAsocNoDir={this.props.onClickAsocNoDir}
            onClickGeneralizacion={this.props.onClickGeneralizacion}
            onClickDependencia={this.props.onClickDependencia}
            onClickExtends={this.props.onClickExtends}
            onClickInclude={this.props.onClickInclude}
            onClickSujeto={this.props.onClickSujeto}
          />
        </Grid>
      </Grid>
    );
  }
}

export default BarraHerramientasCasosDeUso;
