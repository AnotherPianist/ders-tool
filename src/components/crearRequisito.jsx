import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Select from '@material-ui/core/Select';
import './requisitos.css';

class crearRequisito extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            nombre: "",
            id: 0,
            funcional: false,
            tipo: "None",
            requisitos: []
        };
        this.onRequisitoAgregar = this.onRequisitoAgregar.bind(this);
    }
     
    changeTipo = (event) => 
    {
        this.setState({tipo:event.target.value});
        console.log("tipo:" + this.state.tipo);
    };

    changeNombre = (event) => 
    {
        this.setState({nombre:event.target.value});
        console.log("RU nombre:" + this.state.nombre);
    };

    async onClick() {
        localStorage.setItem('requisitos', JSON.stringify(this.state));   
        
    }

    onRequisitoAgregar() {
        this.props.agregarRequisito(this.state);
    }

    render()
    {
        return (
        <React.Fragment>
            <Grid component="label" container alignItems="center" spacing = {2}>
                <Grid item>
                    <IconButton aria-label="add" className = "margin">
                        <AddCircleOutlineIcon onClick={() => { alert("RU: " + this.state.nombre + "\n" + "tipo: " + this.state.tipo) } /*this.onRequisitoAgregar*/}/>
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <TextField fullWidth required label="Nuevo requisito" value={this.state.nombre} onChange = {this.changeNombre} />
                </Grid>
                <Grid item> 
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={this.state.tipo}
                        onChange= {this.changeTipo}
                        //className={classes.selectEmpty}
                        >
                        <MenuItem value="None"><em>None</em></MenuItem>
                        <MenuItem value={"Funcional"}>Funcional</MenuItem>
                        <MenuItem value={"No Funcional"}>No Funcional</MenuItem>
                    </Select>
                </Grid>                
            </Grid>
        </React.Fragment>
        );
    }
} export default crearRequisito