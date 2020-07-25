import React from "react";
import { Stage, Layer, Star, Text, Circle, Ellipse } from "react-konva";
import Konva from "konva";
import { render } from "react-dom";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          {[...Array(this.props.figuras.length)].map((_, i) => (
            <Layer
              key={i}
              id={this.props.figuras[i].id}
              x={this.props.figuras[i].x}
              y={this.props.figuras[i].y}
              draggable
              onDragEnd={(e) => this.props.actualizarCoordenadas(e)}
            >
              <Text
                x={150}
                y={200}
                fontSize={20}
                text={this.props.figuras[i].name}
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
        </Stage>
      </div>
    );
  }
}
export default Canvas;
