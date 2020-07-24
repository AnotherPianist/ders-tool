import React from 'react';
import { Grid, TextField, Select, MenuItem, IconButton, Paper } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class RequisitoSistema extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        nombre: this.props.nombre,
        tipo: this.props.tipo,
    };
    this.eliminarReq = this.eliminarReq.bind(this);
  }
  
  eliminarReq() {
    this.props.eliminarRequisitoSistema(this.props.id);
  }

  render() {
    return(
      <Grid container component={Paper} style={{margin: "8px", marginLeft: "15px"}}>
        <Grid item xs={1} style={{padding: "15px"}}>
          <TextField value={"RS" + this.props.id} InputProps={{readOnly: true}}/>
        </Grid>
        <Grid item xs={8} style={{padding: "15px"}}>
          <TextField fullWidth defaultValue={this.props.nombre} onChange={this.onChangeNombre}/>
        </Grid>
        <Grid item xs={2} style={{padding: "15px"}}>
          <Select defaultValue={this.props.tipo} fullWidth onChange={this.onChangeTipo}>
            <MenuItem value="Funcional">Funcional</MenuItem>
            <MenuItem value="No Funcional">No Funcional</MenuItem>
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
