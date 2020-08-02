import React from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Grid, TextField, Select, MenuItem, Tooltip } from '@material-ui/core';

class CrearRS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {key: Math.random(), tipo: "Funcional"}
  }

  onChangeTipo = (e) => {
    this.setState({tipo: e.target.value});
  }

  onChangeAutocomplete = (e, value) => {
    if (value && value.nombre)
      this.props.crear(value.nombre, value.tipo, this.props.ru, value);
    else if (value && value.inputValue)
      this.props.crear(value.inputValue, this.state.tipo, this.props.ru, undefined);
    else if (value)
      this.props.crear(value, this.state.tipo, this.props.ru, undefined);
    this.setState({key: Math.random()});
  }

  filter = createFilterOptions();

  render() {
    const tiposReq = this.props.tiposRequisitos.map((tipoReq, index) => {
      return (
        <Tooltip key={"tipo" + index} title={tipoReq.descripcion} placement="left" value={tipoReq.nombre}>
          <MenuItem>{tipoReq.nombre}</MenuItem>
        </Tooltip>
      );
    });

    return (
      <Grid container style={{marginLeft: "15px"}}>
        <Grid item xs={10} style={{padding: "34px"}}>
          <Autocomplete
            key={this.state.key}
            onChange={this.onChangeAutocomplete}
            filterOptions={(options, params) => {
              const filtered = this.filter(options, params);
              if (params.inputValue !== '')
                filtered.push({inputValue: params.inputValue, label: `Crear "${params.inputValue}"`});
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={this.props.requisitosInvocar}
            getOptionLabel={(option) => 
              (option.inputValue) ? option.label :
              (option.isRU ? "RU" : "RS") + `${option.id}: ${option.nombre}`
            }
            freeSolo
            renderInput={(params) =>
              <TextField {...params}
                variant="standard"
                placeholder="Nombre requisito sistema"
              />
            }
          />
        </Grid>
        <Grid item xs={2} style={{padding: "15px"}}>
          <Select
            value={this.state.tipo}
            fullWidth size="small"
            onChange={this.onChangeTipo}
          >
            {tiposReq}
          </Select>
        </Grid>
      </Grid>
    );
  }
}

export default CrearRS;
