import React from 'react';
import Requisito from './Requisito';
import CrearRU from './CrearRU';

class ListaRequisitos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requisitos: [],
      contadorRS: 1
    };
    this.crearRequisito = this.crearRequisito.bind(this);
    this.actualizarRequisito = this.actualizarRequisito.bind(this);
    this.eliminarRequisito = this.eliminarRequisito.bind(this);
  }

  crearRequisito(n, t) {
    let nuevoRequisito = {
      id: this.state.requisitos.length + 1,
      nombre: n,
      tipo: t,
    };
    const listaReq = this.state.requisitos.slice();
    listaReq.push(nuevoRequisito);
    this.setState({requisitos: listaReq});
  }

  actualizarRequisito(id, n, t) {
    const listaReq = this.state.requisitos.slice();
    for (const requisito of listaReq) {
      if (requisito.id === id) {
        requisito.nombre = n;
        requisito.tipo = t;
      }
    }
    this.setState({requisitos: listaReq});
  }

  eliminarRequisito(id) {
    const listaReq = [];
    let i = 1;
    for (const requisito of this.state.requisitos) {
      if (requisito.id !== id) {
        const req = {
          id: i,
          nombre: requisito.nombre,
          tipo: requisito.tipo
        };
        i += 1;
        listaReq.push(req);
      }
    }
    this.setState({requisitos: listaReq});
  }

  render() {
    const reqs = this.state.requisitos.map((req) => {
      return (
        <Requisito key={req.id} id={req.id} nombre={req.nombre} tipo={req.tipo} requisitos={[]} actualizarRequisito={this.actualizarRequisito} eliminarRequisito={this.eliminarRequisito}/>
      );
    });
    return(
      <>
        <h3>-</h3>
        <h1>Lista Requisitos</h1>
        {reqs}
        <CrearRU crearRequisito={this.crearRequisito}/>
      </>
    );
  }
}

export default ListaRequisitos;