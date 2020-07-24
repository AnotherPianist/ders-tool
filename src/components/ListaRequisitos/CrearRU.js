import React from 'react';
import { Grid, TextField, Select, MenuItem } from '@material-ui/core';

class CrearRU extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      tipo: "Funcional"
    }
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
    this.crearReq = this.crearReq.bind(this);
  }

  onChangeNombre(e) {
    this.setState({nombre: e.target.value});
  }

  onChangeTipo(e) {
    this.setState({tipo: e.target.value});
  }

  crearReq(e) {
    if (e.key === "Enter") {
      this.props.crearRequisitoUsuario(this.state.nombre, this.state.tipo);
      e.target.value = "";
    }
  }

  render() {
    return(
      <Grid container>
        <Grid item xs={10}>
          <TextField id="nombreForm" fullWidth style={{margin: "15px"}} placeholder="Nombre requisito usuario" onChange={this.onChangeNombre} onKeyDown={this.crearReq}/>
        </Grid>
        <Grid item xs={2}>
          <Select id="tipoForm" defaultValue="Funcional" style={{margin: "15px"}} onChange={this.onChangeTipo}>
            <MenuItem value="Funcional">Funcional</MenuItem>
            <MenuItem value="No Funcional">No Funcional</MenuItem>
          </Select>
        </Grid>
      </Grid>
    );
  }
}

export default CrearRU;