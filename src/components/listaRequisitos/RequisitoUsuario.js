import React from 'react';
import { Grid, TextField, Select, MenuItem, IconButton, Paper, Tooltip } from '@material-ui/core';
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
    const tiposReq = this.props.tiposRequisitos.map((tipoReq) => {
      return (   
        <Tooltip title={tipoReq.descripcion} placement="left" value={tipoReq.nombre}>      
          <MenuItem>{tipoReq.nombre}</MenuItem>
        </Tooltip>
      );
    })

    return(
      <Grid container component={Paper}>
        <Grid item xs={1} style={{padding: "15px"}}>
          <TextField value={"RU" + this.props.id} InputProps={{readOnly: true}}/>
        </Grid>
        <Grid item xs={8} style={{padding: "15px"}}>
          <TextField fullWidth defaultValue={this.props.nombre} onChange={this.onChangeNombre}/>
        </Grid>
        <Grid item xs={2}>
          <Select defaultValue={this.props.tipo} fullWidth onChange={this.onChangeTipo}>
            {tiposReq}
          </Select>
        </Grid>
        <Grid item xs={1} style={{paddingTop: "8px", paddingLeft: "1rem"}} >
          <IconButton color="secondary" onClick={this.eliminarReq}>
            <HighlightOffIcon/>
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default RequisitoUsuario;
