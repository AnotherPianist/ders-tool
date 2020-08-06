import React from "react";
import TimeLine from "react-gantt-timeline";
import { Typography } from '@material-ui/core';

import "./cartaGantt.css";

class CartaGantt extends React.Component {
    constructor(props){
        super(props);
        let data=[];

        this.state = { data: data, links: [], selectedItem: null };
        
    }
    
    componentDidMount = () => {
        {/*Generar Requisitos en Diagrama*/}
        this.addTask("Test Task 1");
      };

    getEndDate() {
        let result = new Date();
        result.setDate(result.getDate() + 3);
        return result;
    }

    getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    onUpdateTask = (item, props) => {
        item.start = props.start ? props.start : item.start;
        item.end = props.end ? props.end : item.end;
        this.setState({ data: [...this.state.data] });
    };

    onSelectItem = item => {
        this.setState({ selectedItem: item });
    };

    addTask = (taskName) => {
        let newTask = {
            id: this.state.data.length + 1,
            start: new Date(),
            end: this.getEndDate(),
            name: taskName,
            color: this.getRandomColor()
        };
        this.setState({ data: [newTask, ...this.state.data] });
    };

    render(){
        return(
            <>
                <Typography variant="h2" style={{margin: "3rem"}}>Carta Gantt</Typography>
                <div className="time-line-container">
                    <TimeLine 
                        data={this.state.data}
                        onUpdateTask={this.onUpdateTask}
                        onSelectItem={this.onSelectItem}
                        selectedItem={this.state.selectedItem}
                    />
                </div>
            </>
        );
    }
}

export default CartaGantt;