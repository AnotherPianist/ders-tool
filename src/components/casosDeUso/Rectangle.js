import React from "react";
import { Rect } from "react-konva";

/**
 * Clase que dibuja al rectángulo y cambia sus atributos si es que se mueve
 * o si es que se le ajusta el tamano
 */
class Rectangle extends React.Component {
  handleChange = (e) => {
    const shape = e.target;

    /**
     * En caso de que al sujeto se le cambie el tamaño, llama a esto
     * y entrega los nuevos atributos del sujeto
     */
    this.props.onTransform({
      x: shape.x(),
      y: shape.y(),
      width: shape.width() * shape.scaleX(),
      height: shape.height() * shape.scaleY(),
      rotation: shape.rotation(),
      id: 10000,
      name: "Sujeto",
      scaleX: shape.scaleX(),
      scaleY: shape.scaleY(),
    });
  };
  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={200}
        height={200}
        scaleX={1}
        scaleY={1}
        fill="white"
        stroke="black"
        strokeScaleEnabled={false}
        name={this.props.name}
        onTransformEnd={this.handleChange}
      />
    );
  }
}

export default Rectangle;
