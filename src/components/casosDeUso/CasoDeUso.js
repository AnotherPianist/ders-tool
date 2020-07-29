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
        "requisito 1",
        "requisito 2",
        "requisito 3",
        "requisito 4",
        "requisito 5",
        "requisito 6",
        "requisito 7",
        "requisito 8",
      ],

      //lineasSolidas contiene las flechas con lineas normales
      lineasSolidas: [],
      //lineasPunteadas contiene las flechas punteadas de extend e include
      lineasPunteadas: [],
      /*
      flechas: [{
        id:0,
        fig1: {x:0,y:0,id:0},
        fig2: {x:0,y:0,id:0}
      }],
      */
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
    this.guardarFlecha = this.guardarFlecha.bind(this);
  }

  guardarFlecha(flecha) {
    console.log('punteadas: '+this.state.lineasPunteadas.length);
    console.log('solidas: '+this.state.lineasSolidas.length);
    console.log(this.state.lineasSolidas[0].fig1);
    /*
    if(this.state.bandera)
    {
      flecha.shift();
      this.setState({bandera: false});
    }
    */
   console.log('la flecha: '+flecha.length)
   console.log('su posicion: '+flecha[0].tipo)
    let ultimaPosicion = flecha.length -1;
    if (flecha[ultimaPosicion].fig1.id !== flecha[ultimaPosicion].fig2.id)
    {
      console.log('dentro del if');
      if (
        flecha[ultimaPosicion].tipo === 0 ||
        flecha[ultimaPosicion].tipo === 3 ||
        flecha[ultimaPosicion].tipo === 4 
      ){
        console.log('guardan2');
        this.setState({lineasSolidas: flecha});
        console.log('flechas solida: ');
        console.log(this.state.lineasSolidas);
      }
      else{
        this.setState({lineasPunteadas: flecha});
        console.log('flecha punteada: ');
        console.log(flecha);
      }
    }
  }

  buscarFlecha(figuraActualizada, e) {
    console.log("actualizando flecha");
    console.log("cantidad flechas solidas: " + this.state.lineasSolidas.length);
    for (let j = 0; j < this.state.lineasSolidas.length; j++) {
      let flechaActualizada = this.state.lineasSolidas[j];
      console.log("flecha actualizada: " + flechaActualizada.fig1);
      console.log("flecha actualizada: " + flechaActualizada.fig2);
      let arrayFlechas = this.state.lineasSolidas;

      console.log(
        "id figura: " +
          figuraActualizada.id +
          " id flecha fig1: " +
          this.state.lineasSolidas[j].fig1.id
      );
      if (figuraActualizada.id === this.state.lineasSolidas[j].fig1.id) {
        if (flechaActualizada !== null) {
          flechaActualizada.fig1.x = e.currentTarget.attrs.x;
          flechaActualizada.fig1.y = e.currentTarget.attrs.y;
          arrayFlechas.splice(j, flechaActualizada);
          this.setState({ lineasSolidas: arrayFlechas });
          console.log("flecha actualizada");
          console.log(this.state.lineasSolidas[j]);
        }
      } else {
        console.log(
          "id figura: " +
            figuraActualizada.id +
            " id flecha fig2: " +
            this.state.lineasSolidas[j].fig2.id
        );
        if (figuraActualizada.id === this.state.lineasSolidas[j].fig2.id) {
          flechaActualizada.fig2.x = e.currentTarget.attrs.x;
          flechaActualizada.fig2.y = e.currentTarget.attrs.y;
          arrayFlechas.splice(j, flechaActualizada);
          this.setState({ lineasSolidas: arrayFlechas });
          console.log("flecha actualizada");
          console.log(this.state.lineasSolidas[j]);
        } else {
          console.log("flecha no encontrada en las solidas");
        }
      }
    }
    console.log(
      "cantidad flechas solidas: " + this.state.lineasPunteadas.length
    );
    for (let i = 0; i < this.state.lineasPunteadas.length; i++) {
      let flechaActualizada = this.state.lineasPunteadas[i];
      console.log("flecha actualizada: " + flechaActualizada.fig1);
      console.log("flecha actualizada: " + flechaActualizada.fig2);
      let arrayFlechas = this.state.lineasPunteadas;

      console.log(
        "id figura: " +
          figuraActualizada.id +
          " id flecha fig1: " +
          this.state.lineasPunteadas[i].fig1.id
      );
      if (figuraActualizada.id === this.state.lineasPunteadas[i].fig1.id) {
        if (flechaActualizada !== null) {
          flechaActualizada.fig1.x = e.currentTarget.attrs.x;
          flechaActualizada.fig1.y = e.currentTarget.attrs.y;
          arrayFlechas.splice(i, flechaActualizada);
          this.setState({ lineasPunteadas: arrayFlechas });
          console.log("flecha actualizada");
          console.log(this.state.lineasPunteadas[i]);
        }
      } else {
        console.log(
          "id figura: " +
            figuraActualizada.id +
            " id flecha fig2: " +
            this.state.lineasPunteadas[i].fig2.id
        );
        if (figuraActualizada.id === this.state.lineasPunteadas[i].fig2.id) {
          flechaActualizada.fig2.x = e.currentTarget.attrs.x;
          flechaActualizada.fig2.y = e.currentTarget.attrs.y;
          arrayFlechas.splice(i, flechaActualizada);
          this.setState({ lineasPunteadas: arrayFlechas });
          console.log("flecha actualizada");
          console.log(this.state.lineasPunteadas[i]);
        } else {
          console.log("flecha no encontrada en las punteadas");
        }
      }
    }
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
        this.buscarFlecha(figuras[index], e);
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
          <Box p={1} width="100%" borderRight="outset" bgcolor="white">
            <Box p={1} width={250}>
              <BarraHerramientaCasosDeUso
                requisitos={this.state.requisitos}
                onClickRequisito={this.crearFigura}
              />
            </Box>
          </Box>
          <Box flexShrink={0} bgcolor="white">
            <Canvas
              figuras={this.state.figuras}
              lineasPunteadas={this.state.lineasPunteadas}
              lineasSolidas={this.state.lineasSolidas}
              guardarFlecha={this.guardarFlecha}
              actualizarCoordenadas={this.actualizarCoordenadas}
            />
          </Box>
        </Box>
      </div>
    );
  }
}
export default CasoDeUso;
