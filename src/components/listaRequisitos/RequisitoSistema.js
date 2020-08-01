import React from 'react';
import { Grid, TextField, Select, MenuItem, IconButton, Paper, Tooltip } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class RequisitoSistema extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        nombre: this.props.nombre,
        tipo: this.props.tipo
    };
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.eliminarReq = this.eliminarReq.bind(this);
  }

  onChangeNombre(e) {
    this.props.actualizarRequisito(this.props.id, e.target.value, this.state.tipo);
    this.setState({nombre: e.target.value});
  }


  onChangeTipo(e) {
    this.props.actualizarRequisito(this.props.id, this.state.nombre, e.target.value);
    this.setState({tipo: e.target.value});
  }
  
  eliminarReq() {
    this.props.eliminarRequisitoSistema(this.props.id);
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
      <Grid container component={Paper} style={{margin: "8px", marginLeft: "15px"}}>
        <Grid item xs={1} style={{padding: "15px"}}>
          <TextField value={"RS" + this.props.id} InputProps={{readOnly: true}}/>
        </Grid>
        <Grid item xs={8} style={{padding: "15px"}}>
          <TextField fullWidth value={this.props.nombre} disabled={(this.props.invoca === -1) ? false : true} onChange={this.onChangeNombre}/>
        </Grid>
        <Grid item xs={2}>
          <Select value={this.props.tipo} fullWidth onChange={this.onChangeTipo}>
            {tiposReq}
          </Select>
        </Grid>
        <Grid item xs={1} style={{paddingTop: "8px", paddingLeft: "1rem"}}>
          <IconButton color="secondary" onClick={this.eliminarReq}>
              <HighlightOffIcon/>
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default RequisitoSistema;
