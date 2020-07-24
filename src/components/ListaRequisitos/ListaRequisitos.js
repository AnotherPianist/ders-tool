import React from 'react';
import RequisitoUsuario from './RequisitoUsuario';
import CrearRU from './CrearRU';
import CrearRS from './CrearRS';
import RequisitoSistema from './RequisitoSistema';

class ListaRequisitos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requisitosUsuario: [],
      requisitosSistema: [],
      contadorRU: 0,
      contadorRS: 0
    };
    this.crearRequisitoUsuario = this.crearRequisitoUsuario.bind(this);
    this.actualizarRequisito = this.actualizarRequisito.bind(this);
    this.eliminarRequisitoUsuario = this.eliminarRequisitoUsuario.bind(this);
    this.eliminarRequisitoSistema = this.eliminarRequisitoSistema.bind(this);
    this.crearRequisitoSistema = this.crearRequisitoSistema.bind(this);
    this.getRequisitosSistema = this.getRequisitosSistema.bind(this);
  }

  crearRequisitoUsuario(n, t) {
    let nuevoRequisito = {
      key: this.state.contadorRU,
      id: this.state.requisitosUsuario.length + 1,
      nombre: n,
      tipo: t,
    };
    const listaReq = this.state.requisitosUsuario.slice();
    listaReq.push(nuevoRequisito);
    this.setState({
      requisitosUsuario: listaReq,
      contadorRU: this.state.contadorRU + 1,
    });
  }

  crearRequisitoSistema(n, t, r){
    let nuevoRequisito = {
      key: this.state.contadorRS,
      id: this.state.requisitosSistema.length + 1,
      nombre: n,
      tipo: t,
      refRU: r
    };
    const listaReq = this.state.requisitosSistema.slice();
    listaReq.push(nuevoRequisito);
    this.setState({
      requisitosSistema: listaReq,
      contadorRS: this.state.contadorRS + 1,
    });
  }

  actualizarRequisito(id, n, t) {
    const listaReq = this.state.requisitosUsuario.slice();
    for (const requisito of listaReq) {
      if (requisito.id === id) {
        requisito.nombre = n;
        requisito.tipo = t;
      }
    }
    this.setState({requisitosUsuario: listaReq});
  }

  eliminarRequisitoUsuario(id) {  
    const listaReq = [];
    let i = 1;
    for (const requisito of this.state.requisitosUsuario) {   
      if (requisito.id !== id) {
        const req = {
          key: requisito.key,
          id: i,
          nombre: requisito.nombre,
          tipo: requisito.tipo
        };
        i = i+1;
        listaReq.push(req);
      }
      if(requisito.id === id){
        this.eliminarRequisitosSistemaRU(requisito.id);
      }
    }
    this.setState({requisitosUsuario: listaReq});
  }

  eliminarRequisitoSistema(id) {
    const listaReq = [];
    let i = 1;
    for (const requisito of this.state.requisitosSistema) {
      if (requisito.id !== id) {
        const req = {
          key: requisito.key,
          id: i,
          nombre: requisito.nombre,
          tipo: requisito.tipo,
          refRU: requisito.refRU
        };
        i = i+1;
        listaReq.push(req);
      }
    }
    this.setState({requisitosSistema: listaReq});
  }
 
  getRequisitosSistema(idRU){
    const reqsSistema = this.state.requisitosSistema.map((req) => {
      if(req.refRU === idRU){
        return <RequisitoSistema key={req.key} id={req.id} nombre={req.nombre} tipo={req.tipo} eliminarRequisitoSistema={this.eliminarRequisitoSistema}/>
      }
    });
    return reqsSistema;
  }

  eliminarRequisitosSistemaRU(idRU){
    const listaReq = [];
    let i = 1;
    for (const requisitoSistema of this.state.requisitosSistema) {
      if (requisitoSistema.refRU !== idRU) {
        const req = {
          key: requisitoSistema.key,
          id: i,
          nombre: requisitoSistema.nombre,
          tipo: requisitoSistema.tipo,        
          refRU: (requisitoSistema.refRU>idRU) ? requisitoSistema.refRU-1 : requisitoSistema.refRU
        };
        i = i+1;
        listaReq.push(req);
      }
    }
    this.setState({requisitosSistema: listaReq});   
  }

  render() {
    const reqsUsuario = this.state.requisitosUsuario.map((req) => {
      return (
        <div>
          <RequisitoUsuario key={req.key} id={req.id} nombre={req.nombre} tipo={req.tipo} actualizarRequisito={this.actualizarRequisito} eliminarRequisitoUsuario={this.eliminarRequisitoUsuario} />
          {this.getRequisitosSistema(req.id)}
          <CrearRS refRU={req.id} crearRequisitoSistema={this.crearRequisitoSistema}/>
        </div>
      );
    });

    return(
      <>
        <h3>-</h3>
        <h1>Lista requisitosUsuario</h1>
        {reqsUsuario}
        <CrearRU crearRequisitoUsuario={this.crearRequisitoUsuario}/>
      </>
    );
  }
}

export default ListaRequisitos;