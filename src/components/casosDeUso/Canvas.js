import React from "react";
import {
  Stage,
  Layer,
  Text,
  Line,
  Ellipse,
  Arrow,
  Circle,
  Group,
} from "react-konva";
import calculateSize from "calculate-size";
import Rectangle from "./Rectangle";
import TransformerComponent from "./TransformerComponent";

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedShapeName: "",
      nroClick: 0,
    };
  }

  /**
  *Se encarga de inicializar el ancho que tendrá la elipse, 
  *adaptandose
  al tamaño del texto según la fuente y su tamaño
  */
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
  dibujarTextoRequisito = (i) => {
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
   * Funcion que crea una nueva flecha punteada
   * @param linea linea entre 2 figuras que contiene la informacion para convertise a una flecha
   */
  nuevaFlechaPunteada = (linea) => {
    return (
      <Arrow
        points={[linea.fig1.x, linea.fig1.y, linea.fig2.x, linea.fig2.y]}
        dash={[5, 5, 0.001, 5]}
        fill="black"
        tension={1}
        closed
        stroke="black"
        lineJoin="round"
      />
    );
  };
  /**
   * Funcion que dibuja la etiqueta de las lineas include (<<i>>) o extend (<<e>>)
   * @param  linea linea entre 2 figuras que contiene la informacion para convertise a una flecha
   */
  dibujarEtiqueta = (linea) => {
    return (
      <Text
        x={this.calcularpuntomedio(linea.fig1.x, linea.fig2.x)}
        y={this.calcularpuntomedio(linea.fig1.y, linea.fig2.y)}
        fontSize={17}
        fontStyle="italic"
        text={linea.etiqueta}
        wrap="char"
        align="center"
      />
    );
  };
  /**
   * Funcion que dibuja una flecha punteada de tipo dependencia, include o extend
   * con las respectivas etiquetas
   * @param  i indice de la flecha a dibujar desde el arreglo de lineasPunteadas, que contiene todas las lineas punteadas definidas
   */
  dibujarFlechaPunt = (i) => {
    const linea = this.props.lineasPunteadas[i];
    const tipo = linea.tipo;
    if (tipo === 5) {
      return this.nuevaFlechaPunteada(linea);
    } else if (tipo === 1 || tipo === 2) {
      return (
        <>
          {this.nuevaFlechaPunteada(linea)}
          {this.dibujarEtiqueta(linea)}
        </>
      );
    }
  };
  /**
   * Funcion que obtiene una nueva linea solida
   * @param linea linea entre 2 figuras que contiene la informacion para dibujarla
   */
  nuevaLineaNormal = (linea) => {
    return (
      <Line
        points={[linea.fig1.x, linea.fig1.y, linea.fig2.x, linea.fig2.y]}
        tension={1}
        closed
        stroke="black"
      />
    );
  };
  /**
   * Funcion que obtiene una nueva flecha solida con le flecha de distinto color dependiendo del tipo (generalizacion o asignacion)
   * @param  linea linea entre 2 figuras que contiene la informacion para convertise a una flecha
   */
  nuevaFlechaNormal = (linea) => {
    var fill;
    if (linea.tipo === 3) {
      fill = "black";
    }
    if (linea.tipo === 4) {
      fill = "white";
    }
    return (
      <Arrow
        points={[linea.fig1.x, linea.fig1.y, linea.fig2.x, linea.fig2.y]}
        tension={1}
        fill={fill}
        closed
        stroke="black"
      />
    );
  };
  /**
   * Funcion que dibuja una nueva linea (asignacion no dirigida) o una nueva flecha solida (generalizacion o asignacion dirigida)
   * @param  i indice de la flecha a dibujar desde el arreglo de lineasSolidas, que contiene todas las lineas solidas definidas
   */
  dibujarLineaNormal = (i) => {
    let tipo = this.props.lineasSolidas[i].tipo;
    const linea = this.props.lineasSolidas[i];
    if (tipo === 0) {
      return this.nuevaLineaNormal(linea);
    } else if (tipo === 3 || tipo === 4) {
      return this.nuevaFlechaNormal(linea);
    }
  };
  /**
   * Funcion que calcula el punto medio de una recta definida por dos puntos
   * @param pto1 punto 1 o punto de inicio de la recta
   * @param pto2 punto 2 o punto final de la recta
   */
  calcularpuntomedio = (pto1, pto2) => {
    return (pto1 + pto2) / 2;
  };

  nuevaLinea = () => {
    return {
      fig1: this.props.figura1,
      fig2: this.props.figura2,
      tipo: this.props.tipo,
    };
  };

  procesarPrimerClick = (e, tipoFigura) => {
    let fig1 = {
      x: 0,
      y: 0,
      id: 0,
      tipo: tipoFigura,
    };
    fig1.x = e.currentTarget.attrs.x;
    fig1.y = e.currentTarget.attrs.y;
    fig1.id = e.currentTarget.attrs.id;
    this.props.setFigura1(fig1);

    this.setState({ nroClick: this.state.nroClick + 1 });
  };
  procesarSegundoClick = (e, tipoFigura) => {
    let fig2 = {
      x: 0,
      y: 0,
      id: 0,
      tipo: tipoFigura,
    };
    fig2.x = e.currentTarget.attrs.x;
    fig2.y = e.currentTarget.attrs.y;
    fig2.id = e.currentTarget.attrs.id;
    this.props.setFigura2(fig2);

    let figuras = this.props.encontrarPuntosMasCercanos();
    this.props.setFigura1(figuras.fig1);
    this.props.setFigura2(figuras.fig2);
  };
  /**
   * Funcion que es verdadera cuando las figuras comparadas son diferentes,
   * es decir que no es la misma figura. Es falsa en el caso contrario.
   */
  entreDistintasFiguras = () => {
    if (this.props.figura1.id !== this.props.figura2.id) {
      return true;
    } else {
      return false;
    }
  };
  entreActores = () => {
    if (
      (this.props.figura1.tipo === "actor") &
      (this.props.figura2.tipo === "actor")
    ) {
      return true;
    } else {
      return false;
    }
  };
  entreRequisitos = () => {
    if (
      (this.props.figura1.tipo === "requisito") &
      (this.props.figura2.tipo === "requisito")
    ) {
      return true;
    } else {
      return false;
    }
  };
  /**
   * Funcion que define la linea entre dos figuras. Se procesaran 2 click consecutivos sobre las figuras que indicaran inicio y final de la linea.
   * nroClick = 0 es el primer click que define el inicio de la linea,
   * nroClick = 1 es el segundo click que define el fin de la linea.
   * @param e evento
   */
  definirLinea = (e, isActor, isRequisito) => {
    this.setState({ nroClick: 0 });
    this.props.setDibujarLinea(false);
    const tipoLinea = this.props.tipo;

    //se definen lineas que tengan una figura de inicio y final diferentes, es decir, que no sean la misma figura.
    if (this.entreDistintasFiguras()) {
      //tipo de linea asignacion, se dibujan sin importar el tipo de figura, sea actor o requisito
      if (tipoLinea === 0 || tipoLinea === 3) {
        let lineasSolidas = this.props.lineasSolidas;
        lineasSolidas.push(this.nuevaLinea());
        this.props.guardarFlecha(lineasSolidas);

        //linea de tipo generalizacion, se dibuja solo entre actores
      } else if ((tipoLinea === 4) & this.entreActores()) {
        let lineasSolidas = this.props.lineasSolidas;
        lineasSolidas.push(this.nuevaLinea());
        this.props.guardarFlecha(lineasSolidas);

        //lineas de tipo dependencia, include y extend. Se dibujan solo entre requisitos
      } else if (tipoLinea === 1 || tipoLinea === 2 || tipoLinea === 5) {
        if (this.entreRequisitos()) {
          let lineasPunteadas = this.props.lineasPunteadas;
          const linea = this.nuevaLinea();

          //include, se asigna la etiqueta de <<i>>
          if (tipoLinea === 1) {
            linea.etiqueta = "<<i>>";

            //extend, se asigna la etiqueta de <<e>>
          } else if (tipoLinea === 2) {
            linea.etiqueta = "<<e>>";
          }
          lineasPunteadas.push(linea);
          this.props.guardarFlecha(lineasPunteadas);
        }
      }
    }
  };

  dibujarActor() {
    return (
      <>
        <Line points={[0, -30, 0, 0]} tension={1} closed stroke="black" />
        <Line points={[0, 0, -10, 25]} tension={1} closed stroke="black" />
        <Line points={[0, 0, 10, 25]} tension={1} closed stroke="black" />
        <Line points={[0, -15, -15, 0]} tension={1} closed stroke="black" />
        <Line points={[0, -15, 15, 0]} tension={1} closed stroke="black" />
        <Circle x={0} y={-30} radius={10} fill="white" stroke="black" />
        <Text
          x={-23}
          y={30}
          fontSize={20}
          text="Actor"
          wrap="char"
          align="center"
          onClick={() => {
            this.ExporBase64();
          }}
        />
      </>
    );
  }
  /**
   * Función que se encarga de desplegar el rectángulo que representa al sujeto, junto a su texto
   * respectivo, dandele la opción de reajustar su tamano
   */
  dibujarSujeto = () => {
    return (
      <Layer key={10000}>
        {this.props.sujetos.map((sujeto, i) => (
          <>
            <Rectangle
              key={i}
              {...sujeto}
              onTransform={(newProps) => {
                this.handleRectChange(newProps, i);
              }}
            />
            <Text
              x={
                sujeto.x +
                sujeto.ancho / 2 -
                calculateSize(sujeto.name, {
                  font: "Arial",
                  fontSize: "20px",
                }).width /
                  2
              }
              y={sujeto.y + 5}
              fontSize={20}
              text={sujeto.name}
              wrap="char"
              align="center"
            />
          </>
        ))}
        <TransformerComponent
          selectedShapeName={this.state.selectedShapeName}
        />
      </Layer>
    );
  };

  /**
   * Función que se encarga de setear el nombre de la figura que se está seleccionando,
   * en este caso solo cambia el nombre del sujeto, ya que solo se utiliza en éste,
   * Además detecta si es que se está haciendo click sobre el transformador (puntos que agrandan
   * al sujeto)
   * @param {evento} e
   */
  handleStageMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: "",
      });
      return;
    }

    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }
    const name = e.target.name();
    const rect = this.props.sujetos.find((r) => r.name === name);
    if (rect) {
      this.setState({
        selectedShapeName: name,
      });
    } else {
      this.setState({
        selectedShapeName: "",
      });
    }
  };

  /**
   * Función que se encarga de guardar los datos del sujeto, cuando este se mueve o
   * se le ajusta el tamano
   * @param {propiedades del nuevo sujeto} newProps
   */
  handleRectChange = (newProps, i) => {
    let sujeto = newProps;

    this.props.actualizarSujeto({ sujeto, i });
  };

  render() {
    return (
      <div>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={this.handleStageMouseDown}
          ref={(node) => {
            this.stageRef = node;
          }}
        >
          <Layer>
            {/** Ciclo para dibujar actores*/}
            {[...Array(this.props.actores.length)].map((_, i) => (
              <Group
                key={i}
                draggable
                id={this.props.actores[i].id}
                x={this.props.actores[i].x}
                y={this.props.actores[i].y}
                onClick={(e) => {
                  if (this.props.dibujarLinea) {
                    if (this.state.nroClick === 0) {
                      this.procesarPrimerClick(e, "actor");
                    } else if (this.state.nroClick === 1) {
                      this.procesarSegundoClick(e, "actor");
                      this.definirLinea(e);
                    }
                  }
                }}
                onDragEnd={(e) => {
                  this.props.actualizarCoordenadasActores(e);
                  this.props.guardarImagen(
                    this.stageRef.getStage().toDataURL()
                  );
                }}
              >
                {/** Linea individual, obtenido desde el arreglo de flechas*/}
                {this.dibujarActor()}
              </Group>
            ))}

            {/** Ciclo para dibujar lineas normales */}

            {[...Array(this.props.lineasSolidas.length)].map((_, i) => (
              <Group key={i}>
                {/** Linea individual, obtenido desde el arreglo de flechas*/}
                {this.dibujarLineaNormal(i)}
              </Group>
            ))}

            {/** Ciclo para dibujar lineas punteadas include y extend */}
            {[...Array(this.props.lineasPunteadas.length)].map((_, i) => (
              <Group key={i}>
                {/** Linea individual, obtenido desde el arreglo de flechas*/}
                {this.dibujarFlechaPunt(i)}
              </Group>
            ))}

            {[...Array(this.props.figuras.length)].map((_, i) => (
              <Group
                key={i}
                id={this.props.figuras[i].id}
                x={this.props.figuras[i].x}
                y={this.props.figuras[i].y}
                draggable
                onDragEnd={(e) => {
                  this.props.actualizarCoordenadas(e);
                  this.props.guardarImagen(
                    this.stageRef.getStage().toDataURL()
                  );
                }}
                onClick={(e) => {
                  if (this.props.dibujarLinea) {
                    if (this.state.nroClick === 0) {
                      this.procesarPrimerClick(e, "requisito");
                    } else if (this.state.nroClick === 1) {
                      this.procesarSegundoClick(e, "requisito");
                      this.definirLinea(e);
                    }
                  }
                }}
              >
                {/* El texto se debería dibujar después de la elipse para que se 
              muestre encima de ella, pero si no lo dibujo antes también, no funciona bien,
              no sé por qué */}
                {this.dibujarTextoRequisito(i)}
                {this.dibujarElipse(i)}
                {this.dibujarTextoRequisito(i)}
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Canvas;
