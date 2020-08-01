import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, TextField, Select, MenuItem, Tooltip } from '@material-ui/core';

class CrearRS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      tipo: "Funcional"
    }
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeTipo = this.onChangeTipo.bind(this);
  }

  onChangeNombre(e) {
    this.setState({nombre: e.target.value});
  }

  onChangeTipo(e) {
    this.setState({tipo: e.target.value});
  }

  crearReq = (e) => {
    if (e.key === "Enter" && this.state.nombre.length !== 0) {
      this.props.crearRequisitoSistema(this.state.nombre, this.state.tipo, this.props.refRU, -1);
      this.setState({nombre: ""});
      e.target.value = "";   
    }   
  }

  crearReqInvocar = (e, value) => {
    if (!(value == null)) {
      this.props.crearRequisitoSistema("Invocar a " + (value.ru ? "RU" : "RS") + value.id + ": " + value.nombre, value.tipo, this.props.refRU, value.key);
      this.setState({nombre: ""});
      e.target.value = "";
    }
  }

  render() {
    const tiposReq = this.props.tiposRequisitos.map((tipoReq) => {
      return (   
        <Tooltip title={tipoReq.descripcion} placement="left" value={tipoReq.nombre}>      
          <MenuItem>{tipoReq.nombre}</MenuItem>
        </Tooltip>
      );
    });

    return(
      <Grid container style={{marginLeft: "15px"}}>
        <Grid item xs={10} style={{padding: "34px"}}>          
          <Autocomplete
            size="small"
            options={this.props.requisitosInvocar}
            getOptionLabel={(option) => (option.ru ? "RU" : "RS") + option.id + ": " + option.nombre}
            style={{ width: 980 }}
            onChange={this.crearReqInvocar}
            onKeyDown={this.crearReq}
            renderInput={(params) =>
              <TextField {...params}
                onChange={this.onChangeNombre}
                id="nombreForm" 
                variant="standard"
                placeholder="Nombre requisito sistema"
              />}
          />
        </Grid>
        <Grid item xs={2} style={{padding: "15px"}}>
          <Select 
            id="tipoForm" 
            defaultValue="Funcional" 
            fullWidth size="small" 
            onChange={this.onChangeTipo}>
            {tiposReq}
          </Select>
        </Grid>
      </Grid>
    );
  }
}

export default CrearRS;
