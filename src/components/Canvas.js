import React from 'react';
import { Stage, Layer, Star, Text ,Circle,Ellipse} from 'react-konva';
import Konva from 'konva';
import { render } from 'react-dom';
class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 

      cont:1
      
    };
  }
    handleDragStart = e => {
        e.target.setAttrs({
          shadowOffset: {
            x: 15,
            y: 15
          },
          scaleX: 1.1,
          scaleY: 1.1
        });
      };
    
      


      render() {
        return (
          <div  >
            <Stage width={window.innerWidth} height={window.innerHeight}>
              <Layer>
              <Ellipse
                    radiusX={100}
                    radiusY={20}
                    stroke="black"
                    strokeWidth={1.5}
                    name ="requisito"
                    x={200}
                    y={200}    
                               
                  />

                  <Text
                    x={150}
                    y={195}

                    fontSize={20}
                    text="Requisito 0"
                    wrap="char"
                    align="center"
                    draggable
                    
                  />
                {[...Array(this.state.cont)].map((_, i) => (
                  <Ellipse
                    radiusX={100}
                    radiusY={20}
                    stroke="black"
                    strokeWidth={1.5}
                    x={200}
                    y={200}
                    draggable
                    shadowColor="black"
                    shadowBlur={10}
                    shadowOpacity={0.6}
                    onDragStart={this.handleDragStart}
                    onDragEnd={e => {
                      if (i == this.state.cont-1) {
                        this.setState({
                          cont:this.state.cont +1
                        });
                     
  
                      }
                      

                    }}
                   

                    

                  />
                ))}
              </Layer>
            </Stage>
          </div>
        );
      }
    }
export default Canvas;
