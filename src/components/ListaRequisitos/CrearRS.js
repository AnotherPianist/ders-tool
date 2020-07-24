import React from 'react';
import { Grid, TextField, Select, MenuItem } from '@material-ui/core';

class CrearRS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      tipo: "Funcional",
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
  if (e.key === "Enter" && this.state.nombre.length !== 0) {
        this.props.crearRequisitoSistema(this.state.nombre, this.state.tipo, this.props.refRU);
        this.setState({nombre: ""});
        e.target.value = "";
    }
  }

  render() {
    return(
      <Grid container style={{marginLeft: "15px"}}>
        <Grid item xs={10} style={{padding: "15px"}}>
          <TextField id="nombreForm" fullWidth size="small" placeholder="Nombre requisito sistema" onChange={this.onChangeNombre} onKeyDown={this.crearReq}/>
        </Grid>
        <Grid item xs={2} style={{padding: "15px"}}>
          <Select id="tipoForm" defaultValue="Funcional" fullWidth size="small" onChange={this.onChangeTipo}>
            <MenuItem value="Funcional">Funcional</MenuItem>
            <MenuItem value="No Funcional">No Funcional</MenuItem>
          </Select>
        </Grid>
      </Grid>
    );
  }
}

export default CrearRS;
