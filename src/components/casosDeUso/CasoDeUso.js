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
      count: 0, //número de figuras ya dibujadas
      requisitos: [
        "requisito1",
        "requisito2",
        "requisito 3",
        "requisito 4",
        "requisito 5",
        "requisito 6",
        "requisito 7",
        "requisito 8",
      ],

      figuras: [
        // {
        //   id:,
        //   x:,
        //   y:,
        //   name:,
        //   alto:,
        //   ancho:,
        // },
      ],
    };
    this.actualizarCoordenadas = this.actualizarCoordenadas.bind(this);
  }

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
    }
  };

  crearFigura = (props) => {
    const { req } = props;

    let count = this.state.count;
    const figura = {
      id: count,
      x: 150,
      y: 100,
      name: req,
      alto: 100,
      ancho: 100,
    };
    count++;
    this.setState({ count });
    let figuras = [...this.state.figuras];
    figuras.push(figura);
    this.setState({ figuras });
  };

  render() {
    return (
      <Grid container>
        <Grid p={2} item xs={3}>
          <BarraHerramientaCasosDeUso
            requisitos={this.state.requisitos}
            onClickRequisito={this.crearFigura}
          />
        </Grid>
        <Grid item xs={9}>
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
