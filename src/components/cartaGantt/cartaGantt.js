import React from "react";
import TimeLine from "react-gantt-timeline";
import { Typography } from '@material-ui/core';

import "./cartaGantt.css";

class CartaGantt extends React.Component {
    constructor(props) {
        super(props);
        let data = [];
        this.state = { data: data, links: [], selectedItem: null };

    }

    componentDidMount = () => {
        this.updateCarta();
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

    addTask = (taskName, rid) => {
        let newTask = {
            id: `${this.state.data.length + 1}-${new Date().getTime()}`,
            start: new Date(),
            end: this.getEndDate(),
            reqId: rid,
            name: taskName,
            color: this.getRandomColor()
        };
        this.setState(prevState => ({ data: [newTask, ...prevState.data] }));
        console.log("Created task ", taskName);
    };

    createTask = (taskName, rid) => {
        return {
            id: `${this.state.data.length + 1}-${new Date().getTime()}`,
            start: new Date(),
            end: this.getEndDate(),
            reqId: rid,
            name: taskName,
            color: this.getRandomColor()
        };
    };

    updateTask = (task) => {
        let newName = this.props.requisitos.find(item => item.key === task.reqId).nombre;
        return { id: task.id, start: task.start, end: task.end, task: task.reqId, name: newName, color: task.color };
    };

    filterLink(newData, link) {
        let start = newData.find(item => item.id === link.start);
        let end = newData.find(item => item.id === link.end);
        return start && end;
    }

    updateCarta = () => {
        let { requisitos } = this.props;
        let { data, links } = this.props.cartaGantt;

        let newData = requisitos.map(req => {
            let existingTask = data.find(task => task.reqId === req.key);
            if (!existingTask) return this.createTask(req.nombre, req.key);
            if (existingTask.name !== req.nombre) return this.updateTask(existingTask);
            return existingTask;
        });

        let newLinks = links.filter(link => this.filterLink(newData, link));
        this.setState({ data: newData, links: newLinks });
    };

    componentWillUnmount = () => {
        this.props.actualizar({ data: this.state.data, links: this.state.links });
    };

    render() {
        return (
            <>
                <Typography variant="h2" style={{ margin: "3rem" }}>Carta Gantt</Typography>
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