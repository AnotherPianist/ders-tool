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
      refRU:[r],
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
          refRU: requisito.refRU.slice()
        };
        listaReq.push(req);
      }
    }
    this.props.actualizarRequisitosSistema(listaReq);
  }
 
  obtenerRequisitosSistema = (idRU) => {
    console.log(this.props.requisitosSistema);
    const reqsSistema = this.props.requisitosSistema.map((req) => {
      for (const refRU of req.refRU) {
        console.log(idRU);
        console.log(refRU);
        if (refRU === idRU){
          console.log("entre");
          return <RequisitoSistema
                    key={req.key}
                    id={req.id}
                    nombre={req.nombre}
                    tipo={req.tipo}
                    eliminarRequisitoSistema={this.eliminarRequisitoSistema}
                    tiposRequisitos={this.props.tiposRequisitos}
                  />      
        }
      }
    });
    return reqsSistema;
  }

  obtenerRequisitosParaInvocar = (idRU) => {
    const requisitosInvocar = [];
    this.props.requisitosSistema.map((req) => {
      for(const refRU of req.refRU){
        if (refRU !== idRU){
          const reqSistema = {
            key: req.key,
            refRU: req.refRU,
            id: req.id,
            nombre: "RS"+req.id+": "+req.nombre,
            tipo: req.tipo
          };
          requisitosInvocar.push(reqSistema);
        }
      }
    });
    this.props.requisitosUsuario.map((req) => {
      if(req.id !== idRU){
        const reqUsuario = {
          key: req.key,
          id: req.id,
          nombre: "RU"+req.id+": "+req.nombre,
          tipo: req.tipo
        };
        requisitosInvocar.push(reqUsuario);
      }
    });
    return requisitosInvocar;
  }

  invocarRequisito = (tipo, idReq, idRU) => {
    const requisitosSistema = this.props.requisitosSistema.slice();
    if(tipo === "RS"){
      for(const requisitoSistema of requisitosSistema){
        if(requisitoSistema.id === idReq){
          if(!this.tieneRefRU(requisitoSistema,idRU)){
            requisitoSistema.refRU.push(idRU);
          }
        }  
      }
    }
    this.props.actualizarRequisitosSistema(requisitosSistema);
  }

  eliminarRequisitosSistemaRU = (idRU) => {
    const listaReq = [];
    let i = 1;
    for (const requisitoSistema of this.props.requisitosSistema) {
      for(const refRU of requisitoSistema.refRU){
        if (refRU !== idRU) {
          const listaRefRU = [];
          for(const refRU of requisitoSistema.refRU){
            listaRefRU.push((refRU > idRU) ? refRU-1 : refRU);
          }
          const req = {
            key: requisitoSistema.key,
            id: i++,
            nombre: requisitoSistema.nombre,
            tipo: requisitoSistema.tipo,        
            refRU: listaRefRU.slice()
          };
          listaReq.push(req);
        }
      }
    }
    this.props.actualizarRequisitosSistema(listaReq);  
  }

  tieneRefRU(requisito, refRUNueva){
    for(const refRU of requisito.refRU){
      if(refRU === refRUNueva){
        return true;
      }
    }
    return false;
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
          {this.obtenerRequisitosSistema(req.id)}
          <CrearRS 
            key={"crear" + req.key} 
            refRU={req.id} 
            crearRequisitoSistema={this.crearRequisitoSistema} 
            tiposRequisitos={this.props.tiposRequisitos}
            requisitosInvocar={this.obtenerRequisitosParaInvocar(req.id)}
            invocarRequisito={this.invocarRequisito}
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
