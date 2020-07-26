import React from 'react';
import RequisitoUsuario from './RequisitoUsuario';
import RequisitoSistema from './RequisitoSistema';
import CrearRU from './CrearRU';
import CrearRS from './CrearRS';
import { Container, Typography } from '@material-ui/core';

class ListaRequisitos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contadorRU: 0,
      contadorRS: 0
    };
  }

  crearRequisitoUsuario = (n, t) => {
    let nuevoRequisito = {
      key: this.state.contadorRU,
      id: this.props.requisitosUsuario.length + 1,
      nombre: n,
      tipo: t,
    };
    const listaReq = this.props.requisitosUsuario.slice();
    listaReq.push(nuevoRequisito);
    this.setState({contadorRU: this.state.contadorRU + 1});
    this.props.actualizarRequisitosUsuario(listaReq);
  }

  crearRequisitoSistema = (n, t, r) => {
    let nuevoRequisito = {
      key: this.state.contadorRS,
      refRU: r,
      id: this.props.requisitosSistema.length + 1,
      nombre: n,
      tipo: t
    };
    const listaReq = this.props.requisitosSistema.slice();
    listaReq.push(nuevoRequisito);
    this.setState({contadorRS: this.state.contadorRS + 1});
    this.props.actualizarRequisitosSistema(listaReq);
  }

  actualizarRequisitoUsuario = (id, n, t) => {
    const listaReq = this.props.requisitosUsuario.slice();
    for (const requisito of listaReq) {
      if (requisito.id === id) {
        requisito.nombre = n;
        requisito.tipo = t;
      }
    }
    this.props.actualizarRequisitosUsuario(listaReq);
  }

  eliminarRequisitoUsuario = (id) => {  
    const listaReq = [];
    let i = 1;
    for (const requisito of this.props.requisitosUsuario) {   
      if (requisito.id !== id) {
        const req = {
          key: requisito.key,
          id: i++,
          nombre: requisito.nombre,
          tipo: requisito.tipo
        };
        listaReq.push(req);
      }
      else
        this.eliminarRequisitosSistemaRU(requisito.id);
    }
    this.props.actualizarRequisitosUsuario(listaReq);
  }

  eliminarRequisitoSistema = (id) => {
    const listaReq = [];
    let i = 1;
    for (const requisito of this.props.requisitosSistema) {
      if (requisito.id !== id) {
        const req = {
          key: requisito.key,
          id: i++,
          nombre: requisito.nombre,
          tipo: requisito.tipo,
          refRU: requisito.refRU
        };
        listaReq.push(req);
      }
    }
    this.props.actualizarRequisitosSistema(listaReq);
  }
 
  getRequisitosSistema = (idRU) => {
    const reqsSistema = this.props.requisitosSistema.map((req) => {
      if (req.refRU === idRU)
        return <RequisitoSistema
                  key={req.key}
                  id={req.id}
                  nombre={req.nombre}
                  tipo={req.tipo}
                  eliminarRequisitoSistema={this.eliminarRequisitoSistema}
                  tiposRequisitos={this.props.tiposRequisitos}
                />
      return null;
    });
    return reqsSistema;
  }

  eliminarRequisitosSistemaRU = (idRU) => {
    const listaReq = [];
    let i = 1;
    for (const requisitoSistema of this.props.requisitosSistema) {
      if (requisitoSistema.refRU !== idRU) {
        const req = {
          key: requisitoSistema.key,
          id: i++,
          nombre: requisitoSistema.nombre,
          tipo: requisitoSistema.tipo,        
          refRU: (requisitoSistema.refRU > idRU) ? requisitoSistema.refRU - 1 : requisitoSistema.refRU
        };
        listaReq.push(req);
      }
    }
    this.props.actualizarRequisitosSistema(listaReq);  
  }

  render() {
    const reqsUsuario = this.props.requisitosUsuario.map((req) => {
      return (
        <>
          <RequisitoUsuario 
            key={req.key} 
            id={req.id} 
            nombre={req.nombre}
            tipo={req.tipo} 
            actualizarRequisito={this.actualizarRequisitoUsuario} 
            eliminarRequisitoUsuario={this.eliminarRequisitoUsuario} 
            tiposRequisitos={this.props.tiposRequisitos}
          />
          {this.getRequisitosSistema(req.id)}
          <CrearRS 
            key={"crear" + req.key} 
            refRU={req.id} 
            crearRequisitoSistema={this.crearRequisitoSistema} 
            tiposRequisitos={this.props.tiposRequisitos}
          />
        </>
      );
    });

    return(
      <Container>
        <Typography variant="h4" style={{margin: "1rem"}}>Lista de Requisitos</Typography>
        {reqsUsuario}
        <CrearRU 
          crearRequisitoUsuario={this.crearRequisitoUsuario} 
          tiposRequisitos={this.props.tiposRequisitos}
        />
      </Container>
    );
  }
}

export default ListaRequisitos;
