import React from 'react';
import { Typography } from '@material-ui/core';
import VistaTiposRequisitos from './tipoRequisito/VistaTiposRequisitos';

class Ajustes extends React.Component {
  render() {
    return(
      <>
        <Typography variant="h3" style={{margin: "1rem"}}>Ajustes</Typography>
        <VistaTiposRequisitos tipos={this.props.tiposRequisitos} crear={this.props.crear} actualizar={this.props.actualizar} eliminar={this.props.eliminar}/>
      </>
    );
  }
}

export default Ajustes;
