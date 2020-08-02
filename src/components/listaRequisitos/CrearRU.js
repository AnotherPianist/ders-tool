import React from 'react';
import { Grid, TextField, Select, MenuItem, Tooltip } from '@material-ui/core';

class CrearRU extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nombre: "", tipo: "Funcional"};
  }

  onChangeNombre = (e) => {
    this.setState({nombre: e.target.value});
  }

  onChangeTipo = (e) => {
    this.setState({tipo: e.target.value});
  }

  crearReq = (e) => {
    if (e.key === "Enter" && this.state.nombre.length !== 0) {
      this.props.crear(this.state.nombre, this.state.tipo);
      this.setState({nombre: ""});
      e.target.value = "";
    }
  }

  render() {
    const tiposReq = this.props.tiposRequisitos.map((tipoReq, index) => {
      return (   
        <Tooltip key={"tipo" + index} title={tipoReq.descripcion} placement="left" value={tipoReq.nombre}>      
          <MenuItem>{tipoReq.nombre}</MenuItem>
        </Tooltip>
      );
    })

    return (
      <Grid container>
        <Grid item xs={10} style={{padding: "16px"}}>
          <TextField
            id="nombreForm"
            fullWidth placeholder="Nombre requisito usuario"
            onChange={this.onChangeNombre}
            onKeyDown={this.crearReq}
          />
        </Grid>
        <Grid item xs={2}>
            <Select
              id="tipoForm"
              defaultValue="Funcional"
              fullWidth
              onChange={this.onChangeTipo}
            >
              {tiposReq}
            </Select>
        </Grid>
      </Grid>
    );
  }
}

export default CrearRU;
