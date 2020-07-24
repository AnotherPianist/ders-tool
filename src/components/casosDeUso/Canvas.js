import React from 'react';
import { Stage, Layer, Star, Text ,Circle,Ellipse} from 'react-konva';
import Konva from 'konva';
import { render } from 'react-dom';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      figuras: [
        {id: 1, x: 100, y: 100, name: "hola como estasdf", alto: 100,ancho:100 },
        {id: 5, x: 200, y: 200, name: "hola comos estas", alto: 100,ancho:100 },
        {id: 7, x: 300, y: 300, name: "hola como estas", alto: 100,ancho:100 } 
      ],
        cont:1
      
    };

    

  }
  

    
      


      render() {
        return (
          <div  >
            <Stage width={window.innerWidth} height={window.innerHeight}>
            {[...Array(this.state.figuras.length)].map((_, i) => (
                <Layer
                    key={i}
                    id={this.state.figuras[i].id}
                    x={this.state.figuras[i].x}
                    y={this.state.figuras[i].y}
                    draggable
                  
                    onDragMove={e=>{
                      //actualizacion de coordenadas en la lista de figuras
                      for (let index = 0; index < this.state.figuras.length; index++) {

                        if (this.state.figuras[index].id==e.currentTarget.attrs.id) {
                          //actualizacion de datos en lista figuras
                          var figuras = this.state.figuras;
                          figuras[index].x = e.currentTarget.attrs.x
                          figuras[index].y = e.currentTarget.attrs.y
                          this.setState({figuras: figuras});
                        }

                        //console.log(e.target.children[0].textWidth)

                        
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








              
            </Stage>
          </div>
        );
      }
    }
export default Canvas;
