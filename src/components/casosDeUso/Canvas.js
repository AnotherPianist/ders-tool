import React from "react";
import { Stage, Layer, Text, Line, Ellipse } from "react-konva";
import calculateSize from "calculate-size";
import { Button } from "@material-ui/core";

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //Flecha1 contiene las flechas normales
      lineasSolidas: [],
      //Flecha2 contiene las flechas punteadas de extend e include
      lineasPunteadas: [],
      //Arreglo de los puntos iniciales y finales de una linea
      posLinea: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      dibujarLinea: false,
      tipo: 0,
      nroClick: 0,
      resetClick: false,
    };
  }

  componentDidMount() {
    let figuras = this.props.figuras;
    let ancho;

    this.props.figuras.forEach((e) => {
      ancho = calculateSize(e.name, {
        font: "Arial",
        fontSize: "20px",
      });
      e.ancho = ancho.width;
    });
    this.setState({ figuras: figuras });
  }

  dibujarTexto = (i) => {
    return (
      <Text
        x={-this.props.figuras[i].ancho / 2}
        y={-10}
        fontSize={20}
        text={this.props.figuras[i].name}
        wrap="char"
        align="center"
      />
    );
  };

  dibujarElipse = (i) => {
    return (
      <Ellipse
        width={100 + this.props.figuras[i].ancho}
        height={50}
        stroke="black"
        strokeWidth={1.5}
        x={0}
        y={0}
        fill="white"
      />
    );
  };

  dibujarBotonAux = (name, tipo) => {
    return (
      <Button
        onClick={() => {
          console.log("click en linea1");
          this.setState({ dibujarLinea: true });
          this.setState({ tipo: tipo });
        }}
        color="primary"
        variant="outlined"
      >
        {name}
      </Button>
    );
  };
  dibujarLineaPunteada = (i) => {
    return (
      <Line
        points={[
          this.state.lineasPunteadas[i].x1,
          this.state.lineasPunteadas[i].y1,
          this.state.lineasPunteadas[i].x2,
          this.state.lineasPunteadas[i].y2,
        ]}
        dash={[5, 5, 0.001, 1]}
        tension={1}
        closed
        stroke="black"
        lineJoin="round"
      />
    );
  };
  dibujarLineaNormal = (i) => {
    return (
      <Line
        points={[
          this.state.lineasSolidas[i].x1,
          this.state.lineasSolidas[i].y1,
          this.state.lineasSolidas[i].x2,
          this.state.lineasSolidas[i].y2,
        ]}
        tension={1}
        closed
        stroke="black"
      />
    );
  };
  calcularpuntomedio = (pto1, pto2) => {
    return (pto1 + pto2) / 2;
  };
  dibujarEtiquetaLinea = (i) => {
    return (
      <Text
        x={this.calcularpuntomedio(
          this.state.lineasPunteadas[i].x1,
          this.state.lineasPunteadas[i].x2
        )}
        y={this.calcularpuntomedio(
          this.state.lineasPunteadas[i].y1,
          this.state.lineasPunteadas[i].y2
        )}
        fontSize={17}
        fontStyle="italic"
        text={this.state.lineasPunteadas[i].etiqueta}
        wrap="char"
        align="center"
      />
    );
  };
  /* Funcion para cuando se clickea en una figura, si el modo linea esta activado (linea=true) se procesaran 2 clicks de mouse:
  nroClick = 0 es el primer click que define el inicio de la linea,
  nroClick = 1 es el segundo clicl que define el fin de la linea.
  */
  definirLinea = (e) => {
    if (this.state.nroClick === 0) {
      console.log("click1..");
      let array = this.state.posLinea;
      array[0].x = e.currentTarget.attrs.x;
      array[0].y = e.currentTarget.attrs.y;
      array[1].x = e.currentTarget.attrs.x;
      array[1].y = e.currentTarget.attrs.y;
      this.setState({ posLinea: array });
    }
    if (this.state.nroClick === 1) {
      console.log("click2..");
      let array = this.state.posLinea;
      array[0].x = e.currentTarget.attrs.x;
      array[0].y = e.currentTarget.attrs.y;
      array[1].x = this.state.posLinea[1].x;
      array[1].y = this.state.posLinea[1].y;
      this.setState({ posLinea: array });
      this.setState({ resetClick: true });
    }
    this.setState({ nroClick: this.state.nroClick + 1 });
    /**Cuando se alcanza el segundo click se resetean las variables, 
    se desactiva del modo linea y se guarda la linea obtenida*/
    if (this.state.resetClick) {
      console.log("reseteando..");
      this.setState({ nroClick: 0 });
      this.setState({ resetClick: false });
      this.setState({ dibujarLinea: false });
      var newFlecha = {
        x1: this.state.posLinea[0].x,
        y1: this.state.posLinea[0].y,
        x2: this.state.posLinea[1].x,
        y2: this.state.posLinea[1].y,
        etiqueta: "",
      };
      if (this.state.tipo === 0) {
        var flecha1 = this.state.lineasSolidas;
        flecha1.push(newFlecha);
        this.setState({
          flecha1: flecha1,
        });
      } else {
        var flecha2 = this.state.lineasPunteadas;
        if (this.state.tipo === 1) {
          newFlecha.etiqueta = "<<i>>";
        } else {
          newFlecha.etiqueta = "<<e>>";
        }

        flecha2.push(newFlecha);
        this.setState({
          flecha2: flecha2,
        });
      }
    }
  };
  render() {
    return (
      <div>
        {/* Botones temporales para activar-desactivar el modo linea, si linea = true 
        la funcionalidad onClick dibuja, si es false no lo hace. Hay varios botones segun el 
        tipo de la linea*/}
        {this.dibujarBotonAux("Linea", 0)} {/*LINEA NORMAL*/}
        {this.dibujarBotonAux("Linea_inc", 1)} {/*LINEA TIPO INCLUDE*/}
        {this.dibujarBotonAux("Linea_ext", 2)} {/*LINEA TIPO EXTEND */}
        <Stage width={window.innerWidth} height={window.innerHeight}>
          {/** Ciclo para dibujar lineas normales */}

          {[...Array(this.state.lineasSolidas.length)].map((_, i) => (
            <Layer key={i} draggable>
              {/** Linea individual, obtenido desde el arreglo de flechas*/}
              {this.dibujarLineaNormal(i)}
            </Layer>
          ))}

          {/** Ciclo para dibujar lineas punteadas include y extend */}
          {[...Array(this.state.lineasPunteadas.length)].map((_, i) => (
            <Layer key={i} draggable>
              {/** Linea individual, obtenido desde el arreglo de flechas*/}
              {this.dibujarLineaPunteada(i)}
              {this.dibujarEtiquetaLinea(i)}
            </Layer>
          ))}

          {[...Array(this.props.figuras.length)].map((_, i) => (
            <Layer
              key={i}
              id={this.props.figuras[i].id}
              x={this.props.figuras[i].x}
              y={this.props.figuras[i].y}
              draggable
              onDragEnd={(e) => this.props.actualizarCoordenadas(e)}
              onClick={(e) => {
                if (this.state.dibujarLinea) {
                  this.definirLinea(e);
                }
              }}
            >
              {/* El texto se debería dibujar después de la elipse para que se 
              muestre encima de ella, pero si no lo dibujo antes también, no funciona bien,
              no sé por qué */}
              {this.dibujarTexto(i)}
              {this.dibujarElipse(i)}
              {this.dibujarTexto(i)}
            </Layer>
          ))}
        </Stage>
      </div>
    );
  }
}

export default Canvas;
