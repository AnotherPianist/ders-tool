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

    componentDidMount = async () => {
        await this.updateCarta();
        this.state.data.filter(item => item.isRU).forEach(parent => this.updateParentTaskDate(parent));
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

    onUpdateTask = async (item, props) => {
        if (!item.isRU) {
            item.start = props.start ? props.start : item.start;
            item.end = props.end ? props.end : item.end;
            await this.setState({ data: [...this.state.data] });
            this.updateParentTaskDate(item);
        }
    };

    onSelectItem = item => {
        this.setState({ selectedItem: item });
    };

    createTask = (taskName, req) => {
        return {
            id: `${this.state.data.length + 1}-${new Date().getTime()}`,
            start: new Date(),
            end: this.getEndDate(),
            reqKey: req.key,
            reqId: req.id,
            name: taskName,
            color: this.getRandomColor(),
            isRU: req.isRU,
            refRU: req.refRU,
        };
    };

    updateTaskAttributes = (task) => {
        let req = this.props.requisitos.find(item => item.key === task.reqKey);
        return { ...task, reqId: req.id, name: req.nombre, refRU: req.refRU };
    };

    filterLink(newData, link) {
        let start = newData.find(item => item.id === link.start);
        let end = newData.find(item => item.id === link.end);
        return start && end;
    }

    shouldTaskUpdate(task, req) {
        return (task.name !== req.nombre) || (task.refRU !== req.refRU) || (task.reqId !== req.id);
    }

    updateCarta = async () => {
        let { requisitos } = this.props;
        let { data, links } = this.props.cartaGantt;

        let newData = requisitos.map(req => {
            let existingTask = data.find(task => task.reqKey === req.key);
            if (!existingTask) return this.createTask(req.nombre, req);
            if (this.shouldTaskUpdate(existingTask, req)) return this.updateTaskAttributes(existingTask);
            return existingTask;
        });

        let newLinks = links.filter(link => this.filterLink(newData, link));
        await this.setState({ data: newData, links: newLinks });
    };

    getParentTask = (task) => {
        return this.state.data.find(t => t.isRU && t.reqId === task.refRU);
    }

    getChildrenTask = (parentTask) => {
        return this.state.data.filter(t => !t.isRU && t.refRU === parentTask.reqId);
    }

    updateParentTaskDate = task => {
        let parentTask = (task.isRU) ? task : this.getParentTask(task);
        console.log(parentTask);
        let children = this.getChildrenTask(parentTask);
        let dates = [];
        children.forEach(child => dates.push(child.start, child.end));

        const parentIndex = this.state.data.indexOf(parentTask);
        let newData = [...this.state.data];
        let newStart = Math.min(...dates);
        let newEnd = Math.max(...dates);
        newData[parentIndex] = { ...newData[parentIndex], start: newStart, end: newEnd };
        this.setState({ data: newData });
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