import React from 'react';
import CrearTipoReq from './CrearTipoRequisito';
import ModificarTipoReq from './ModificarTipoRequisito';
import EliminarTipoReq from './EliminarTipoRequisito';

class Ajustes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Usado para llevar cuenta de ids únicos entregados
      contadorReq: 2,
      // Lista de requisitos
      tipoRequisitos: [
        {
          value: '1',
          label: 'Funcional',
        },
        {
          value: '2',
          label: 'No Funcional',
        },
      ]
    }
  }

  crearRequisito = nombre => {
    let nuevoRequisito = {
      value: this.state.contadorReq,
      label: nombre
    };

    this.setState(prevState =>
      ({
        contadorReq: prevState.contadorReq + 1,
        tipoRequisitos: [...prevState.tipoRequisitos, nuevoRequisito]
      })
    );
  };

  eliminarRequisito = value => {
    this.setState(prevState =>
      ({
        tipoRequisitos: prevState.tipoRequisitos.filter(item => item.value !== value)
      })
    );
  };

  modificarRequisito = (value, nuevoNombre) => {
    this.setState(prevState =>
      ({
        tipoRequisitos: prevState.tipoRequisitos.map(
          item => {
            if (item.value === value) item.label = nuevoNombre; return item;
          }
        )
      }));
  };

  render() {
    return (
      <div className="App">
        <CrearTipoReq handleCrear={this.crearRequisito} />
        <ModificarTipoReq requisitos={this.state.tipoRequisitos} handleModificar={this.modificarRequisito} />
        <EliminarTipoReq requisitos={this.state.tipoRequisitos} handleEliminar={this.eliminarRequisito} />
      </div>
    );
  }
}

export default Ajustes;
