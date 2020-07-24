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
        <Grid container style={{margin: "15px"}}>
            <Grid container component={Paper} style={{margin: "15px"}}>
                <Grid item xs={1}>
                <TextField value={"RS" + this.props.id} InputProps={{readOnly: true}} style={{margin: "15px"}}/>
                </Grid>
                <Grid item xs={7}>
                <TextField fullWidth defaultValue={this.props.nombre} style={{margin: "15px"}} onChange={this.onChangeNombre}/>
                </Grid>
                <Grid item xs={2} style={{marginLeft: "20px"}}>
                <Select defaultValue={this.props.tipo} style={{margin: "15px"}} onChange={this.onChangeTipo}>
                    <MenuItem value="Funcional">Funcional</MenuItem>
                    <MenuItem value="No Funcional">No Funcional</MenuItem>
                </Select>
                </Grid>
                <Grid item xs={1}>
                <IconButton color="secondary" style={{margin: "15px"}} onClick={this.eliminarReq}>
                    <HighlightOffIcon/>
                </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
  }
}

export default RequisitoSistema;