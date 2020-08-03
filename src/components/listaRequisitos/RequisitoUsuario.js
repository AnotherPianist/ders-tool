import React from 'react';
import { Grid, TextField, Select, MenuItem, IconButton, Tooltip, Typography } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class RequisitoUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nombre: this.props.ru.nombre, tipo: this.props.ru.tipo};
  }

  onChangeNombre = (e) => {
    this.setState({nombre: e.target.value});
    this.props.editar(this.props.ru, e.target.value, this.state.tipo);
  }

  onChangeTipo = (e) => {
    this.setState({tipo: e.target.value});
    this.props.editar(this.props.ru, this.state.nombre, e.target.value);
  }

  eliminarReq = () => {
    this.props.eliminar(this.props.ru);
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
      <Grid container>
        <Grid item xs={1} style={{paddingTop: "1rem"}}>
          <Typography variant="subtitle1">{"RU" + this.props.ru.id}</Typography>
        </Grid>
        <Grid item xs={8} style={{paddingTop: "1rem", paddingRight: "1rem"}}>
          <TextField fullWidth defaultValue={this.props.ru.nombre} onChange={this.onChangeNombre}/>
        </Grid>
        <Grid item xs={2}>
          <Select defaultValue={this.props.ru.tipo} fullWidth onChange={this.onChangeTipo}>
            {tiposReq}
          </Select>
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

export default RequisitoUsuario;
