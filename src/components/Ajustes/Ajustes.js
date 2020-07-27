import React from 'react';
import { Typography } from '@material-ui/core';
import VistaTiposRequisitos from './tipoRequisito/VistaTiposRequisitos';

class Ajustes extends React.Component {
  render() {
    return(
      <>
        <Typography variant="h3" style={{margin: "1rem"}}>Ajustes</Typography>
        <VistaTiposRequisitos/>
      </>
    );
  }
}

export default Ajustes;
