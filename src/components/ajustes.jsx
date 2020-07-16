import React from 'react';
import CrearTipoReq from './crearTipoRequisito';
import ModificarTipoReq from './modificarTipoRequisito';
import EliminarTipoReq from './eliminarTipoRequisito';

export default function Ajustes() {
  return (
    <div className="App">
      <CrearTipoReq/>
      <ModificarTipoReq/>
      <EliminarTipoReq/>
    </div>
  );
}
