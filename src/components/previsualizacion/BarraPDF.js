import React from 'react';
import {List, ListItem, ListItemIcon, Checkbox, ListItemText, Paper, Typography} from '@material-ui/core'

class BarraPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DERS: true,
      ListadeRequisitos: true,
      TarjetasdeVolere: true,
      Casosdeuso: true,
      AjustesAmbientales: true,
      PuntosdeFunción: true,
      AnálisisdeRepago: true
    };
  };

  handleToggle = (value) => () => {
    value = value.replace(/\s/g, '');
      var check = this.state[value];
      if (check === false)
        this.setState({[value]: true});
      else
        this.setState({[value]: false});
  }

  onChangeCheckBox(e) {
    this.props.recibirEstados(this.state.DERS, this.state.ListadeRequisitos, this.state.TarjetasdeVolere, this.state.Casosdeuso, this.state.AjustesAmbientales, this.state.PuntosdeFunción, this.state.AnálisisdeRepago);
  }
  
  render() {
    return (
      <>
        <Typography variant="h5" style={{margin: "2rem"}}>Visualizar documento</Typography>
        <Paper style={{margin: "2rem"}}>
          <List>
            {["DERS", "Lista de Requisitos", "Tarjetas de Volere", "Casos de uso", "Ajustes Ambientales", "Puntos de Función", "Análisis de Repago"].map((value) => {
              return (
                <ListItem key={value} button onClick={this.handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={this.state[value.replace(/\s/g, '')]}
                      color="primary"
                      edge="start"
                      tabIndex={-1}
                      disableRipple
                      onChange={this.onChangeCheckBox}
                    />
                  </ListItemIcon>
                  <ListItemText primary={value}/>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </>
    );
  }
}

export default BarraPDF;
