import React from 'react';
import { Grid, TextField, Select, MenuItem, IconButton, Tooltip, Typography } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class RequisitoSistema extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nombre: this.props.rs.nombre, tipo: this.props.rs.tipo};
  }

  onChangeNombre = (e) => {
    this.setState({nombre: e.target.value});
    this.props.editar(this.props.rs, e.target.value, this.state.tipo);
  }

  onChangeTipo = (e) => {
    this.setState({tipo: e.target.value});
    this.props.editar(this.props.rs, this.state.nombre, e.target.value);
  }

  eliminarReq = () => {
    this.props.eliminar(this.props.rs);
  }

  render() {
    const tiposReq = this.props.tiposRequisitos.map((tipoReq, index) => {
      return (
        <Tooltip key={"tipo" + index} title={tipoReq.descripcion} placement="left" value={tipoReq.nombre}>
          <MenuItem>{tipoReq.nombre}</MenuItem>
        </Tooltip>
      );
    });

    return (
      <Grid container style={{paddingLeft: "1rem"}}>
        <Grid item xs={1} style={{paddingTop: "1rem"}}>
          <Typography variant="subtitle1">{"RS" + this.props.rs.id}</Typography>
        </Grid>
        <Grid item xs={8} style={{paddingTop: "1rem", paddingRight: "1rem"}}>
          {
            this.props.rs.invocaA ? 
            <Typography variant="subtitle1">{this.props.rs.nombre}</Typography> :
            <TextField fullWidth value={this.props.rs.nombre} onChange={this.onChangeNombre}/>
          }
        </Grid>
        <Grid item xs={2}>
          {
            this.props.rs.invocaA ?
            <Typography variant="subtitle1" style={{paddingTop: "1rem"}}>{this.props.rs.tipo}</Typography> :
            <Select fullWidth value={this.props.rs.tipo} onChange={this.onChangeTipo}>{tiposReq}</Select>
          }
        </Grid>
        <Grid item xs={1}>
          <IconButton color="secondary" onClick={this.eliminarReq}>
            <HighlightOffIcon/>
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default RequisitoSistema;
