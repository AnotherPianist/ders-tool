import React from "react";
import { Stage, Layer, Star, Text, Line, Ellipse } from "react-konva";
import calculateSize from "calculate-size";
import Konva from "konva";
import { render } from "react-dom";
import { Button } from "@material-ui/core";

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flecha: [
        {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0,
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
          {[...Array(this.props.figuras.length)].map((_, i) => (
            <Layer
              key={i}
              id={this.props.figuras[i].id}
              x={this.props.figuras[i].x}
              y={this.props.figuras[i].y}
              draggable
              onDragEnd={(e) => this.props.actualizarCoordenadas(e)}
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
                x={-this.props.figuras[i].ancho / 2}
                y={-10}
                fontSize={20}
                text={this.props.figuras[i].name}
                wrap="char"
                align="center"
              />
              <Ellipse
                width={100 + this.props.figuras[i].ancho}
                height={50}
                stroke="black"
                strokeWidth={1.5}
                x={0}
                y={0}
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
