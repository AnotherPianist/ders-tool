import React from "react";
import { Stage, Layer, Text, Line, Ellipse, Arrow } from "react-konva";
import calculateSize from "calculate-size";

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
    this.props.setFiguras(figuras);
  }
  /**
   * Funcion que dibuja el texto del requisito sobre la elipse
   * @param i indice de la figura sobre la que dibujar el texto
   */
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
  /**
   * Funcion que dibuja una elipse que representa un requisito
   * @param i indice de la figura a dibujar
   */
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

  /**
   * Funcion que dibuja una flecha punteada con la etiqueta de include o extend.
   * @param  i indice de la flecha a dibujar
   */
  dibujarFlechaPunt = (i) => {
    let tipo = this.props.lineasPunteadas[i].tipo;
    if (this.props.lineasPunteadas[i].tipo === 5) {
      console.log("Dibujando Punt:");
      console.log(this.props.lineasPunteadas[i]);
      return (
        <Arrow
          points={[
            this.props.lineasPunteadas[i].fig1.x,
            this.props.lineasPunteadas[i].fig1.y,
            this.props.lineasPunteadas[i].fig2.x,
            this.props.lineasPunteadas[i].fig2.y,
          ]}
          dash={[5, 5, 0.001, 5]}
          fill="black"
          tension={1}
          closed
          stroke="black"
          lineJoin="round"
        />
      );
    } else if (tipo === 1 || tipo === 2) {
      console.log("Dibujando Punt:");
      console.log(this.props.lineasPunteadas[i]);
      return (
        <>
          <Arrow
            points={[
              this.props.lineasPunteadas[i].fig1.x,
              this.props.lineasPunteadas[i].fig1.y,
              this.props.lineasPunteadas[i].fig2.x,
              this.props.lineasPunteadas[i].fig2.y,
            ]}
            dash={[5, 5, 0.001, 5]}
            fill="black"
            tension={1}
            closed
            stroke="black"
            lineJoin="round"
          />
          <Text
            x={this.calcularpuntomedio(
              this.props.lineasPunteadas[i].fig1.x,
              this.props.lineasPunteadas[i].fig2.x
            )}
            y={this.calcularpuntomedio(
              this.props.lineasPunteadas[i].fig1.y,
              this.props.lineasPunteadas[i].fig2.y
            )}
            fontSize={17}
            fontStyle="italic"
            text={this.props.lineasPunteadas[i].etiqueta}
            wrap="char"
            align="center"
          />
        </>
      );
    }
  };
  /**
   * Funcion que dibuja una linea normal o una flecha normal
   * @param i indice de la linea o la flecha a dibujar.
   */
  dibujarLineaNormal = (i) => {
    let tipo = this.props.lineasSolidas[i].tipo;
    if (tipo === 0) {
      console.log("Dibujando Solida:");
      return (
        <Line
          points={[
            this.props.lineasSolidas[i].fig1.x,
            this.props.lineasSolidas[i].fig1.y,
            this.props.lineasSolidas[i].fig2.x,
            this.props.lineasSolidas[i].fig2.y,
          ]}
          tension={1}
          closed
          stroke="black"
        />
      );
    } else if (tipo === 3 || tipo === 4) {
      console.log("Dibujando Solida:");
      var fill = "blue";
      if (tipo === 3) {
        fill = "black";
      }
      if (tipo === 4) {
        fill = "white";
      }
      return (
        <Arrow
          points={[
            this.props.lineasSolidas[i].fig1.x,
            this.props.lineasSolidas[i].fig1.y,
            this.props.lineasSolidas[i].fig2.x,
            this.props.lineasSolidas[i].fig2.y,
          ]}
          tension={1}
          fill={fill}
          closed
          stroke="black"
        />
      );
    }
  };

  calcularpuntomedio = (pto1, pto2) => {
    return (pto1 + pto2) / 2;
  };
  /**
   * Funcion que define la linea entre dos figuras. Se procesaran 2 click consecutivos sobre las figuras que indicaran inicio y final de la linea.
   * nroClick = 0 es el primer click que define el inicio de la linea,
   * nroClick = 1 es el segundo click que define el fin de la linea.
   * @param e
   */
  definirLinea = (e) => {
    let fig1 = {
      x: 0,
      y: 0,
      id: 0,
    };
    let fig2 = {
      x: 0,
      y: 0,
      id: 0,
    };
    if (this.props.nroClick === 0) {
      fig1.x = e.currentTarget.attrs.x;
      fig1.y = e.currentTarget.attrs.y;
      fig1.id = e.currentTarget.attrs.id;
      this.props.setFigura1(fig1);
    }
    if (this.props.nroClick === 1) {
      fig2.x = e.currentTarget.attrs.x;
      fig2.y = e.currentTarget.attrs.y;
      fig2.id = e.currentTarget.attrs.id;
      this.props.setFigura2(fig2);
      this.props.setResetClick(true);
    }
    let n = this.props.nroClick;
    n += 1;
    this.props.setNroClick(n);
    /**Cuando se alcanza el segundo click se resetean las variables, 
    se desactiva del modo linea y se guarda la linea obtenida*/
    if (this.props.resetClick) {
      this.props.setNroClick(0);
      this.props.setResetClick(false);
      this.props.setDibujarLinea(false);
      if (
        (this.props.tipo === 0 ||
          this.props.tipo === 3 ||
          this.props.tipo === 4) &
        (this.props.figura1.id !== this.props.figura2.id)
      ) {
        var lineasSolidas = this.props.lineasSolidas;
        lineasSolidas.push({
          fig1: this.props.figura1,
          fig2: this.props.figura2,
          etiqueta: "",
          tipo: this.props.tipo,
        });
        console.log("listaNuevaS: " + lineasSolidas.length);
        this.props.guardarFlecha(lineasSolidas);
      } else if (this.props.figura1.id !== this.props.figura2.id) {
        var lineasPunteadas = this.props.lineasPunteadas;
        if (this.props.tipo === 1) {
          lineasPunteadas.push({
            //  id: this.state.nlinea,
            fig1: this.props.figura1,
            fig2: this.props.figura2,
            etiqueta: "<<i>>",
            tipo: this.props.tipo,
          });
        } else if (this.props.tipo === 2) {
          lineasPunteadas.push({
            //    id: this.state.nlinea,
            fig1: this.props.figura1,
            fig2: this.props.figura2,
            etiqueta: "<<e>>",
            tipo: this.props.tipo,
          });
        } else {
          lineasPunteadas.push({
            // id: this.state.nlinea,
            fig1: this.props.figura1,
            fig2: this.props.figura2,
            etiqueta: "",
            tipo: this.props.tipo,
          });
        }
        if (this.props.figura1.id !== this.props.figura2.id) {
          console.log("listaNuevaP: " + lineasPunteadas.length);
          this.props.guardarFlecha(lineasPunteadas);
        }
      }
    }
  };
  render() {
    return (
      <div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          {/** Ciclo para dibujar lineas normales */}

          {[...Array(this.props.lineasSolidas.length)].map((_, i) => (
            <Layer key={i}>
              {/** Linea individual, obtenido desde el arreglo de flechas*/}
              {this.dibujarLineaNormal(i)}
            </Layer>
          ))}

          {/** Ciclo para dibujar lineas punteadas include y extend */}
          {[...Array(this.props.lineasPunteadas.length)].map((_, i) => (
            <Layer key={i}>
              {/** Linea individual, obtenido desde el arreglo de flechas*/}
              {this.dibujarFlechaPunt(i)}
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
                if (this.props.dibujarLinea) {
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
