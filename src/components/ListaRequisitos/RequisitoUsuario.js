import React from 'react';
import { Grid, TextField, Select, MenuItem, IconButton, Paper } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class RequisitoUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: this.props.nombre,
      tipo: this.props.tipo
    };
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.actualizarReq = this.actualizarReq.bind(this);
    this.eliminarReq = this.eliminarReq.bind(this);
  }

  onChangeNombre(e) {
    this.setState({nombre: e.target.value});
    this.actualizarReq();
  }

  onChangeTipo(e) {
    this.setState({tipo: e.target.value});
    this.actualizarReq();
  }

  actualizarReq() {
    this.props.actualizarRequisito(this.props.id, this.state.nombre, this.state.tipo);
  }

  eliminarReq() {
    this.props.eliminarRequisitoUsuario(this.props.id);
  }

  render() {
    return(
      <Grid container component={Paper} style={{margin: "15px"}}>
        <Grid item xs={0.5}>
          <TextField value={"RU" + this.props.id} InputProps={{readOnly: true}} style={{margin: "15px"}}/>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth defaultValue={this.props.nombre} style={{margin: "15px"}} onChange={this.onChangeNombre}/>
        </Grid>
        <Grid item xs={2} style={{marginLeft: "20px"}}>
          <Select defaultValue={this.props.tipo} style={{margin: "15px"}} onChange={this.onChangeTipo}>
            <MenuItem value="Funcional">Funcional</MenuItem>
            <MenuItem value="No Funcional">No Funcional</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={1}>
          <IconButton color="secondary" style={{margin: "5px"}} onClick={this.eliminarReq}>
            <HighlightOffIcon/>
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default RequisitoUsuario;