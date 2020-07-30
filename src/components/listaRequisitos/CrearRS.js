import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, TextField, Select, MenuItem, Tooltip } from '@material-ui/core';

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
    this.invocarRequisito = this.invocarRequisito.bind(this);
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

  invocarRequisito(e){
    if (e.key === "Enter" && e.target.value !== ""){
      let idReq = parseInt(e.target.value.slice(2).split(":", 1)[0]);
      this.props.invocarRequisito((e.target.value.includes("RU") ? "RU" : "RS"), idReq, this.props.refRU);
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
            onKeyDown={this.invocarRequisito}
            freeSolo
            size="small"
            options={this.props.requisitosInvocar}
            getOptionLabel={(option) => option.nombre}
            style={{ width: 980 }}
            renderInput={(params) => 
              <TextField {...params}
                id="nombreForm" 
                onChange={this.onChangeNombre} 
                onKeyDown={this.crearReq} 
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
