import React from "react";
import { Rect } from "react-konva";
import calculateSize from "calculate-size";
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
      ancho: shape.width() * shape.scaleX(),
      alto: shape.height() * shape.scaleY(),
      rotation: shape.rotation(),
      id: this.props.id,
      name: this.props.name,
      scaleX: shape.scaleX(),
      scaleY: shape.scaleY(),
    });
  };
  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={
          calculateSize(this.props.name, {
            font: "Arial",
            fontSize: "20px",
          }).width + 200
        }
        height={200}
        scaleX={this.props.scaleX}
        scaleY={this.props.scaleY}
        fill="white"
        stroke="black"
        strokeScaleEnabled={false}
        name={this.props.name}
        onDragEnd={this.handleChange}
        onTransformEnd={this.handleChange}
        draggable
      />
    );
  }
}

export default Rectangle;
