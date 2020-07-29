import React, { Component } from "react";
import Box from "@material-ui/core/Box";

import BarraHerramientaCasosDeUso from "./BarraHerramientasCasosDeUso";
import Canvas from "./Canvas";
import calculateSize from "calculate-size";

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
        "requisito1 dshsdbhs jhasdjsaj jsndknfdsjk sansnajsjn jnsdanasdjn",
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
    const ancho = calculateSize(req, {
      font: "Arial",
      fontSize: "20px",
    });
    let count = this.state.count;
    const x = ancho.width / 2 + 100;

    const figura = {
      id: count,
      x: x,
      y: 100,
      name: req,
      alto: 100,
      ancho: ancho.width,
    };
    count++;
    this.setState({ count });
    let figuras = [...this.state.figuras];
    figuras.push(figura);
    this.setState({ figuras });
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Box display="flex" p={1} bgcolor="background.paper">
          <Box p={1} width="100%" borderRight="outset" bgcolor="#f4f4f4">
            <Box p={1} width={250}>
              <BarraHerramientaCasosDeUso
                requisitos={this.state.requisitos}
                onClickRequisito={this.crearFigura}
              />
            </Box>
          </Box>
          <Box p={1} flexShrink={0} bgcolor="white">
            <Canvas
              figuras={this.state.figuras}
              actualizarCoordenadas={this.actualizarCoordenadas}
            />
          </Box>
        </Box>
      </div>
    );
  }
}
export default CasoDeUso;
