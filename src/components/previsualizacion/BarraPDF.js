import React from 'react';
import {Container, List, ListItem, ListItemIcon, Checkbox, ListItemText} from '@material-ui/core'



class BarraPDF extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      DERS: false,
      ListadeRequisitos: false,
      TarjetasdeVolere: false,
      Casosdeuso: false,
      AjustesAmbientales: false,
      PuntosdeFunción: false,
      AnálisisdeRepago: false
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
    
    this.props.recibirEstados( this.state.DERS, this.state.ListadeRequisitos, this.state.TarjetasdeVolere, this.state.Casosdeuso, this.state.AjustesAmbientales, this.state.PuntosdeFunción, this.state.AnálisisdeRepago);

  }

  
  render() {

    return (

      <List className={this.props.useStyles}>
        {["DERS", "Lista de Requisitos", "Tarjetas de Volere", "Casos de uso", "Ajustes Ambientales", "Puntos de Función", "Análisis de Repago"].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return(
            <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
              <ListItemIcon >
                <Checkbox
                  checked = {this.state[value.replace(/\s/g, '')]}
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  onChange={this.onChangeCheckBox}
                />
              </ListItemIcon >
              <ListItemText primary={value}/>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export default BarraPDF;