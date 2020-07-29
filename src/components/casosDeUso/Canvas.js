import React from "react";
import { Stage, Layer, Text, Line, Ellipse, Arrow } from "react-konva";
import calculateSize from "calculate-size";
import { Button } from "@material-ui/core";

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //Arreglo de los puntos iniciales y finales de una linea
      posLinea: [
        {id1: 0, id2: 0},
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      dibujarLinea: false,
      tipo: 0,
      tipoLinea: 0,
      nroClick: 0,
      resetClick: false,
      figura1: {},
      figura2: {}
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
   * Funcion creadora de los botones
   * @param {*} name nombre del boton
   * @param {*} tipo tipo de linea que dibujara el boton:
   * 0 = asociacion no dir, 1 = include, 2 = extend, 3 = asociacion dirigida, 4 = generalizacion
   */
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
  /**
   * Funcion que dibuja una flecha punteada con la etiqueta de include o extend.
   * @param  i indice de la flecha a dibujar
   */
  dibujarFlechaPunt = (i) => {
    if (this.props.lineasPunteadas[i].tipo === 5) {
      console.log("DEPENDENCIA");
      console.log('Tipo: '+this.props.lineasPunteadas[i].tipo);
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
    } else if (this.props.lineasPunteadas[i].tipo === 1 || this.props.lineasPunteadas[i].tipo === 2){

      console.log("include extend");
      console.log('Tipo: '+this.props.lineasPunteadas[i].tipo);
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
    if (this.props.lineasSolidas[i].tipo === 0) {
      console.log("creando linea solida no dirigida");
      console.log('Tipo: '+this.props.lineasSolidas[i].tipo);
      console.log('largo: '+this.props.lineasSolidas.length)
      console.log(this.props.lineasSolidas[i]);
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
    } else {
      var fill = "blue";
      if (this.props.lineasSolidas[i].tipo === 3) {
        console.log('aquii');
        fill = "black";
      } else {
        console.log('aca');
        fill = "white";
      }
      console.log("creando flecha solida dirigida o generalizacion");
      console.log('Tipo: '+this.props.lineasSolidas[i].tipo);
      console.log('largo: '+this.props.lineasSolidas.length)
      return (
        <Arrow
          points={[
            this.props.lineasSolidas[i].fig1.x,
            this.props.lineasSolidas[i].fig2.y,
            this.props.lineasSolidas[i].fig1.x,
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
      id: 0
    };
    let fig2 = {
      x: 0,
      y: 0,
      id: 0
    };
    if (this.state.nroClick === 0) {
      console.log("click1..");
      fig1.x = e.currentTarget.attrs.x;
      fig1.y = e.currentTarget.attrs.y;
      fig1.id = e.currentTarget.attrs.id;
      console.log('se clickeo la figura con id: '+fig1.id);
      console.log('fig1: ');
      console.log(fig1);
      this.setState({figura1: fig1});
    }
    if (this.state.nroClick === 1) {
      console.log("click2..");
      fig2.x = e.currentTarget.attrs.x;
      fig2.y = e.currentTarget.attrs.y;
      fig2.id = e.currentTarget.attrs.id;
      var xAux= fig2.x + 150;
      fig1.x = xAux;
      var yAux= fig2.y + 200;
      fig1.y = yAux;
      console.log('se clickeo la figura con id: '+fig2.id);
      console.log('fig2: ');
      console.log(fig2);
      this.setState({figura2: fig2})
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
      
      
      if (
        this.state.tipo === 0 ||
        this.state.tipo === 3 ||
        this.state.tipo === 4
      ){
        console.log("0 o 3");
        var lineasSolidas = this.props.lineasSolidas;
        console.log(this.props.lineasSolidas.length);
        console.log(this.props.lineasSolidas);
        lineasSolidas.push(
          {
            fig1: this.state.figura1,
            fig2: this.state.figura2,
            etiqueta: "",
            tipo: this.state.tipo
          }
        );
        console.log('ssssssssss');
        console.log(this.props.lineasSolidas.length);
        console.log(this.props.lineasSolidas);
        //console.log('new flecha: '+lineasSolidas.length);
        console.log(this.props.lineasSolidas.length);
        console.log(this.props.lineasSolidas);
        this.props.guardarFlecha(lineasSolidas);
        
      } else {
        if (this.state.tipo === 1) {
          var lineasSolidas = this.props.lineasSolidas;
          lineasSolidas.push(
            {
              id: this.state.nlinea,
              fig1: this.state.figura1,
              fig2: this.state.figura2,
              etiqueta: "<<i>>",
              tipo: this.state.tipo
            }
          );
          console.log('linnnn222: '+lineasSolidas);
          this.props.guardarFlecha(lineasSolidas);

        } else if (this.state.tipo === 2) {
          var lineasPunteadas = this.props.lineasPunteadas;
          lineasPunteadas.push(
            {
              id: this.state.nlinea,
              fig1: this.state.figura1,
              fig2: this.state.figura2,
              etiqueta: "<<e>>",
              tipo: this.state.tipo
            }
          );
          console.log('linnnn222: '+lineasPunteadas);
          this.props.guardarFlecha(lineasPunteadas);
        }
      
      }
    }
  };
  render() {
    return (
      <div>
        {/* Botones temporales para activar-desactivar el modo linea, si linea = true 
        la funcionalidad onClick dibuja, si es false no lo hace. Hay varios botones segun el 
        tipo de la linea. */}
        {this.dibujarBotonAux("Asocia_nodir", 0)} {/*LINEA NORMAL*/}
        {this.dibujarBotonAux("Asocia_dir", 3)}{" "}
        {/*flecha NORMAL con punta cerrada*/}
        {this.dibujarBotonAux("Generalizacion", 4)}{" "}
        {/*flecha NORMAL con punta abierta*/}
        {this.dibujarBotonAux("include", 1)} {/*flecha TIPO INCLUDE*/}
        {this.dibujarBotonAux("extend", 2)} {/*flecha TIPO EXTEND */}
        {this.dibujarBotonAux("depend", 5)} {/*flecha dependencia */}
        <Stage width={window.innerWidth} height={window.innerHeight}>
          {/** Ciclo para dibujar lineas normales */}

          {[...Array(this.props.lineasSolidas.length)].map((_, i) => (
            <Layer key={i} draggable>
              {/** Linea individual, obtenido desde el arreglo de flechas*/}
              {this.dibujarLineaNormal(i)}
              {console.log('dibujado')}
            </Layer>
          ))}

          {/** Ciclo para dibujar lineas punteadas include y extend */}
          {[...Array(this.props.lineasPunteadas.length)].map((_, i) => (
            <Layer key={i} draggable>
              {/** Linea individual, obtenido desde el arreglo de flechas*/}
              {this.dibujarFlechaPunt(i)}
              {console.log('dibujan2')}
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
