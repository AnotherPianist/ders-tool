import React from 'react';
import { Typography } from '@material-ui/core';
import VistaTiposRequisitos from './tipoRequisito/VistaTiposRequisitos';

class Ajustes extends React.Component {
  render() {
    return(
      <>
        <Typography variant="h2" style={{margin: "3rem"}}>Ajustes</Typography>
        <VistaTiposRequisitos tipos={this.props.tiposRequisitos} actualizar={this.props.actualizarTipos}/>
      </>
    );
  }
}

export default Ajustes;
