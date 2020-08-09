import React from 'react';
import { Grid, TextField, Select, MenuItem, IconButton, Paper, Tooltip } from '@material-ui/core';
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
      <Grid container component={Paper} style={{margin: "8px", marginLeft: "15px"}}>
        <Grid item xs={1} style={{padding: "15px"}}>
          <TextField value={"RS" + this.props.rs.id} InputProps={{readOnly: true}}/>
        </Grid>
        <Grid item xs={8} style={{padding: "15px"}}>
          <TextField
            fullWidth
            readOnly={this.props.rs.invocaA === undefined ? false : true}
            value={this.props.rs.nombre}
            onChange={this.props.rs.invocaA === undefined ? this.onChangeNombre : () => {}} 
          />
        </Grid>
        <Grid item xs={2}>
          <Select
            fullWidth
            readOnly={this.props.rs.invocaA === undefined ? false : true}
            value={this.props.rs.tipo}
            onChange={this.props.rs.invocaA === undefined ? this.onChangeTipo : () => {}} 
          >
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
