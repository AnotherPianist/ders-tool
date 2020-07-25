import React from "react";
import { Stage, Layer, Star, Text, Line, Ellipse } from "react-konva";
import Konva from "konva";
import { render } from "react-dom";
import { Button } from "@material-ui/core";

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      figuras: [
        {
          id: 1,
          x: 100,
          y: 100,
          name: "hola como estasdf",
          alto: 100,
          ancho: 100,
        },
        {
          id: 5,
          x: 200,
          y: 200,
          name: "hola comos estas",
          alto: 100,
          ancho: 100,
        },
        {
          id: 7,
          x: 300,
          y: 300,
          name: "hola como estas",
          alto: 100,
          ancho: 100,
        },
      ],
      cont: 1,
      flecha: [
        {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0,
        },
        {
          x1: 100,
          y1: 100,
          x2: 200,
          y2: 200,
        },
        {
          x1: 50,
          y1: 40,
          x2: 123,
          y2: 123,
        },
      ],
      posLinea: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      linea: false,
      nroClick: 0,
      resetClick: false,
    };
  }
  render() {
    return (
      <div>
        <Button
          onClick={() => {
            this.state.linea = !this.state.linea;
            console.log(this.state.linea);
          }}
          color="primary"
          variant="outlined"
        >
          LINEA
        </Button>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          {[...Array(this.state.figuras.length)].map((_, i) => (
            <Layer
              key={i}
              id={this.state.figuras[i].id}
              x={this.state.figuras[i].x}
              y={this.state.figuras[i].y}
              draggable
              onDragMove={(e) => {
                //actualizacion de coordenadas en la lista de figuras
                for (
                  let index = 0;
                  index < this.state.figuras.length;
                  index++
                ) {
                  if (
                    this.state.figuras[index].id == e.currentTarget.attrs.id
                  ) {
                    //actualizacion de datos en lista figuras
                    var figuras = this.state.figuras;
                    figuras[index].x = e.currentTarget.attrs.x;
                    figuras[index].y = e.currentTarget.attrs.y;
                    this.setState({ figuras: figuras });
                  }
                  //console.log(e.target.children[0].textWidth)
                }
              }}
              onClick={(e) => {
                if (this.state.linea) {
                  if (this.state.nroClick === 0) {
                    let array = this.state.posLinea;
                    array[0].x = e.currentTarget.attrs.x + 150;
                    array[0].y = e.currentTarget.attrs.y + 200;
                    array[1].x = array[0].x;
                    array[1].y = array[0].y;
                    this.setState({ posLinea: array });
                  }
                  if (this.state.nroClick === 1) {
                    let array = this.state.posLinea;
                    array[1].x = this.state.posLinea[1].x;
                    array[1].y = this.state.posLinea[1].y;
                    array[0].x = e.currentTarget.attrs.x + 150;
                    array[0].y = e.currentTarget.attrs.y + 200;
                    this.setState({ posLinea: array });
                    this.setState({ resetClick: true });
                  }
                  this.setState({ nroClick: this.state.nroClick + 1 });

                  if (this.state.resetClick) {
                    this.setState({ nroClick: 0 });
                    this.setState({ resetClick: false });
                    this.setState({ linea: false });
                    var flecha = this.state.flecha;
                    flecha.push({
                      x1: this.state.posLinea[0].x,
                      y1: this.state.posLinea[0].y,
                      x2: this.state.posLinea[1].x,
                      y2: this.state.posLinea[1].y,
                    });
                    this.setState({
                      flecha: flecha,
                    });
                  }
                }
              }}
            >
              <Text
                x={150}
                y={200}
                fontSize={20}
                text={this.state.figuras[i].name}
                wrap="char"
                align="center"
              />
              <Ellipse
                width={100}
                height={30}
                stroke="black"
                strokeWidth={1.5}
                x={150}
                y={200}
              />
            </Layer>
          ))}
          {[...Array(this.state.flecha.length)].map((_, i) => (
            <Layer draggable>
              <Line
                points={[
                  this.state.flecha[i].x1,
                  this.state.flecha[i].y1,
                  this.state.flecha[i].x2,
                  this.state.flecha[i].y2,
                ]}
                tension={1}
                closed
                stroke="black"
              />
            </Layer>
          ))}
        </Stage>
      </div>
    );
  }
}
export default Canvas;
