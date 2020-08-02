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

      //Arreglo de los puntos iniciales y finales de una linea
      posLinea: [
        { id1: 0, id2: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      actores: [
        //{
        //nombre: "actor",
        //x: 150,
        //y: 150,
        //},
      ],
      dibujarLinea: false,
      tipo: 0,
      figura1: {},
      figura2: {},
      sujeto: {},
    };
    this.actualizarCoordenadas = this.actualizarCoordenadas.bind(this);
    this.guardarFlecha = this.guardarFlecha.bind(this);
  }

  guardarFlecha(flecha) {
    let ultimaPosicion = flecha.length - 1;
    if (flecha[ultimaPosicion].fig1.id !== flecha[ultimaPosicion].fig2.id) {
      if (
        flecha[ultimaPosicion].tipo === 0 ||
        flecha[ultimaPosicion].tipo === 3 ||
        flecha[ultimaPosicion].tipo === 4
      ) {
        this.setState({ lineasSolidas: flecha });
      } else {
        this.setState({ lineasPunteadas: flecha });
      }
    }
  }

  buscarFlecha(figuraActualizada, e) {
    for (let j = 0; j < this.state.lineasSolidas.length; j++) {
      let flechaActualizada = this.state.lineasSolidas[j];
      let arrayFlechas = this.state.lineasSolidas;
      if (figuraActualizada.id === this.state.lineasSolidas[j].fig1.id) {
        if (flechaActualizada !== null) {
          flechaActualizada.fig1.x = e.currentTarget.attrs.x;
          flechaActualizada.fig1.y = e.currentTarget.attrs.y;

          this.setState({
            figura1: flechaActualizada.fig1,
            figura2: flechaActualizada.fig2,
          });
          let figuras = this.encontrarPuntosMasCercanos();
          flechaActualizada.fig1 = figuras.fig1;
          //flechaActualizada.fig2 = figuras.fig2;

          arrayFlechas.splice(j, flechaActualizada);
          this.setState({ lineasSolidas: arrayFlechas });
        }
      } else {
        if (figuraActualizada.id === this.state.lineasSolidas[j].fig2.id) {
          flechaActualizada.fig2.x = e.currentTarget.attrs.x;
          flechaActualizada.fig2.y = e.currentTarget.attrs.y;
          this.setState({
            figura1: flechaActualizada.fig1,
            figura2: flechaActualizada.fig2,
          });
          let figuras = this.encontrarPuntosMasCercanos();
          flechaActualizada.fig2 = figuras.fig2;
          //flechaActualizada.fig1 = figuras.fig1;
          arrayFlechas.splice(j, flechaActualizada);
          this.setState({ lineasSolidas: arrayFlechas });
        }
      }
    }
    for (let i = 0; i < this.state.lineasPunteadas.length; i++) {
      let flechaActualizada = this.state.lineasPunteadas[i];
      let arrayFlechas = this.state.lineasPunteadas;
      if (figuraActualizada.id === this.state.lineasPunteadas[i].fig1.id) {
        if (flechaActualizada !== null) {
          flechaActualizada.fig1.x = e.currentTarget.attrs.x;
          flechaActualizada.fig1.y = e.currentTarget.attrs.y;
          this.setState({
            figura1: flechaActualizada.fig1,
            figura2: flechaActualizada.fig2,
          });
          let figuras = this.encontrarPuntosMasCercanos();
          flechaActualizada.fig1 = figuras.fig1;

          arrayFlechas.splice(i, flechaActualizada);

          this.setState({ lineasPunteadas: arrayFlechas });
        }
      } else {
        if (figuraActualizada.id === this.state.lineasPunteadas[i].fig2.id) {
          flechaActualizada.fig2.x = e.currentTarget.attrs.x;
          flechaActualizada.fig2.y = e.currentTarget.attrs.y;
          this.setState({
            figura1: flechaActualizada.fig1,
            figura2: flechaActualizada.fig2,
          });
          let figuras = this.encontrarPuntosMasCercanos();
          flechaActualizada.fig2 = figuras.fig2;
        }

        arrayFlechas.splice(i, flechaActualizada);
        this.setState({ lineasPunteadas: arrayFlechas });
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

      if (this.state.sujeto.id === e.currentTarget.attrs.id) {
        var sujeto = this.state.sujeto;
        sujeto.x = e.currentTarget.attrs.x;
        sujeto.y = e.currentTarget.attrs.y;
        //sujeto.ancho = e.target.children[0].textWidth + 100;
        this.setState({ sujeto: sujeto });
      }
    }
  };

  //funcion que actualiza las coordenadas de los actores
  actualizarCoordenadasActores = (e) => {
    //actualizacion de coordenadas en la lista de actores
    for (let index = 0; index < this.state.actores.length; index++) {
      if (this.state.actores[index].id === e.currentTarget.attrs.id) {
        //actualizacion de datos en lista actores
        var actores = this.state.actores;
        actores[index].x = e.currentTarget.attrs.x;
        actores[index].y = e.currentTarget.attrs.y;

        this.setState({ actores: actores });
        this.buscarFlecha(actores[index], e);
      }
    }
  };
  calcularDistanciaDosPuntos = (x1, y1, x2, y2) => {
    let x = Math.pow(x2 - x1, 2);

    let y = Math.pow(y2 - y1, 2);

    let result = x + y;

    return Math.sqrt(result);
  };
  encontrarIndex = (id) => {
    for (let index = 0; index < this.state.figuras.length; index++) {
      if (this.state.figuras[index].id === id) {
        return index;
      }
    }
  };
  encontrarPuntosMasCercanos = () => {
    let fig1 = this.state.figura1;
    let fig2 = this.state.figura2;
    let ancho1;
    let alto1;
    let ancho2;
    let alto2;

    if (fig1.tipo === "requisito") {
      ancho1 = this.state.figuras[this.encontrarIndex(fig1.id)].ancho + 5;
      alto1 = this.state.figuras[this.encontrarIndex(fig1.id)].alto + 5;
    } else {
      ancho1 = 15;
      alto1 = 35;
    }
    if (fig2.tipo === "requisito") {
      ancho2 = this.state.figuras[this.encontrarIndex(fig2.id)].ancho + 5;
      alto2 = this.state.figuras[this.encontrarIndex(fig2.id)].alto + 5;
    } else {
      ancho2 = 15;
      alto2 = 35;
    }
    let id1 = fig1.id;
    let id2 = fig2.id;
    let tipo1 = fig1.tipo;
    let tipo2 = fig2.tipo;

    let x1 = fig1.x;
    let y1 = fig1.y;
    let x2 = fig2.x;
    let y2 = fig2.y;

    let p1 = [
      { x: x1, y: y1 - alto1, id: id1, tipo: tipo1 },
      { x: x1, y: y1 + alto1, id: id1, tipo: tipo1 },
      { x: x1 - ancho1, y: y1, id: id1, tipo: tipo1 },
      { x: x1 + ancho1, y: y1, id: id1, tipo: tipo1 },
    ];
    let p2 = [
      { x: x2, y: y2 - alto2, id: id2, tipo: tipo2 },
      { x: x2, y: y2 + alto2, id: id2, tipo: tipo2 },
      { x: x2 - ancho2, y: y2, id: id2, tipo: tipo2 },
      { x: x2 + ancho2, y: y2, id: id2, tipo: tipo2 },
    ];
    let p1Menor = { p: p1[0] };
    let p2Menor = { p: p2[0] };
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          this.calcularDistanciaDosPuntos(p1[i].x, p1[i].y, p2[j].x, p2[j].y) <
          this.calcularDistanciaDosPuntos(
            p1Menor.p.x,
            p1Menor.p.y,
            p2Menor.p.x,
            p2Menor.p.y
          )
        ) {
          p1Menor.p = p1[i];
          p2Menor.p = p2[j];
        }
      }
    }
    //this.setState({ figura1: p1Menor.p, figura2: p2Menor.p });
    return { fig1: p1Menor.p, fig2: p2Menor.p };
    //this.props.setFigura1(p1Menor.p);
    //this.props.setFigura2(p2Menor.p);
  };
  /**
   * Se encarga de guardar las nuevas props del sujeto.
   * @param {props del sujeto} e
   */
  actualizarSujeto = (e) => {
    this.setState({ sujeto: e.sujeto });
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
      alto: 25,
      ancho: ancho.width,
    };
    count++;
    this.setState({ count });
    let figuras = [...this.state.figuras];
    figuras.push(figura);
    this.setState({ figuras });
  };

  handleFiguras = (figuras) => {
    this.setState({ figuras });
  };

  handleFigura1 = (figura1) => {
    this.setState({ figura1 });
  };

  handleFigura2 = (figura2) => {
    this.setState({ figura2 });
  };

  handleDibujarLinea = (dibujarLinea) => {
    this.setState({ dibujarLinea });
  };

  handleTipo = (tipo) => {
    this.setState({ tipo });
  };

  handleActor = () => {
    let count = this.state.count;
    const actor = {
      id: count,
      nombre: "ingrese nombre",
      x: 100,
      y: 100,
      alto: 0,
      ancho: 0,
    };
    count++;
    this.setState({ count });
    let actores = [...this.state.actores];
    actores.push(actor);
    this.setState({ actores });
  };

  handleAsociacionDirigida = () => {
    this.setState({ dibujarLinea: true });
    this.setState({ tipo: 3 });
  };

  handleAsociacionNoDirigida = () => {
    this.setState({ dibujarLinea: true });
    this.setState({ tipo: 0 });
  };

  handleGeneralizacion = () => {
    this.setState({ dibujarLinea: true });
    this.setState({ tipo: 4 });
  };

  handleDependencia = () => {
    this.setState({ dibujarLinea: true });
    this.setState({ tipo: 5 });
  };

  handleExtends = () => {
    this.setState({ dibujarLinea: true });
    this.setState({ tipo: 2 });
  };

  handleInclude = () => {
    this.setState({ dibujarLinea: true });
    this.setState({ tipo: 1 });
  };

  handleSujeto = () => {
    if (!this.state.sujeto.id) {
      const sujeto = {
        id: 10000,
        x: 0,
        y: 0,
        name: "Sujeto",
        width: 200,
        height: 200,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      };
      this.setState({ sujeto: sujeto });
    }
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
                onClickActor={this.handleActor}
                onClickAsocDir={this.handleAsociacionDirigida}
                onClickAsocNoDir={this.handleAsociacionNoDirigida}
                onClickGeneralizacion={this.handleGeneralizacion}
                onClickDependencia={this.handleDependencia}
                onClickExtends={this.handleExtends}
                onClickInclude={this.handleInclude}
                onClickSujeto={this.handleSujeto}
              />
            </Box>
          </Box>
          <Box flexShrink={0} bgcolor="white">
            <Canvas
              figuras={this.state.figuras}
              actores={this.state.actores}
              lineasPunteadas={this.state.lineasPunteadas}
              lineasSolidas={this.state.lineasSolidas}
              guardarFlecha={this.guardarFlecha}
              actualizarCoordenadas={this.actualizarCoordenadas}
              actualizarCoordenadasActores={this.actualizarCoordenadasActores}
              encontrarPuntosMasCercanos={this.encontrarPuntosMasCercanos}
              actualizarSujeto={this.actualizarSujeto}
              setFiguras={this.handleFiguras}
              setFigura1={this.handleFigura1}
              setFigura2={this.handleFigura2}
              setDibujarLinea={this.handleDibujarLinea}
              tipo={this.state.tipo}
              setTipo={this.handleTipo}
              figura1={this.state.figura1}
              figura2={this.state.figura2}
              dibujarLinea={this.state.dibujarLinea}
              sujeto={this.state.sujeto}
            />
          </Box>
        </Box>
      </div>
    );
  }
}
export default CasoDeUso;
