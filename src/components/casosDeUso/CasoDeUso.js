import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import BarraHerramientaCasosDeUso from "./BarraHerramientasCasosDeUso";
import Canvas from "./Canvas";

/*
Este componente es la pantalla de casos de uso.
Renderiza el canvas y la barra lateral de herramientas en la pantalla de casos de uso
*/
class CasoDeUso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requistos: ["requisito1", "requisito2"],

      figuras: [
        {
          id: 1,
          x: 100,
          y: 100,
          name:
            "hola como estas hola como estas hola como estas hola como estas hola como estas hola como estas hola como estas hola como estas",
          alto: 100,
          ancho: 100,
        },
        {
          id: 5,
          x: 200,
          y: 200,
          name:
            "hola comos estas hola como estas hola como estas hola como estas ",
          alto: 100,
          ancho: 100,
        },
        {
          id: 7,
          x: 300,
          y: 300,
          name: "h",
          alto: 100,
          ancho: 100,
        },
      ],
    };
    this.actualizarCoordenadas = this.actualizarCoordenadas.bind(this);
    this.botonRequisitos = this.botonRequisitos.bind(this);
  }

  botonRequisitos = (e) => {
    console.log("boton");
  };
  //funcion que actualiza las coordenadas
  actualizarCoordenadas = (e) => {
    //actualizacion de coordenadas en la lista de figuras
    for (let index = 0; index < this.state.figuras.length; index++) {
      if (this.state.figuras[index].id === e.currentTarget.attrs.id) {
        //actualizacion de datos en lista figuras
        var figuras = this.state.figuras;
        figuras[index].x = e.currentTarget.attrs.x;
        figuras[index].y = e.currentTarget.attrs.y;
        figuras[index].ancho = e.target.children[0].textWidth;
        this.setState({ figuras: figuras });
      }

      console.log(this.state.figuras);
    }
  };
  render() {
    return (
      <Grid container>
        <Grid p={2} item xs={3}>
          <BarraHerramientaCasosDeUso
            requisitos={this.state.requistos}
            botonRequisitos={this.botonRequisitos}
          />
        </Grid>
        <Grid item xs={9} borderLeft={1}>
          <Canvas
            bgcolor="blue"
            figuras={this.state.figuras}
            actualizarCoordenadas={this.actualizarCoordenadas}
          />
        </Grid>
      </Grid>
    );
  }
}
export default CasoDeUso;
